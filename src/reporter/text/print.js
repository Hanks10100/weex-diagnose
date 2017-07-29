const _ = require('lodash')
const { sizeof, getPadFunction } = require('../../utils')

const defaultOptions = {
  gap: 2,
  indent: 0,
  align: 'left',
  showLine: false,
  tableTheme: [
    '┌─┬┐'.split(''),
    '├─┼┤'.split(''),
    '| ||'.split(''),
    '| ||'.split(''),
    '└─┴┘'.split('')
  ],
}

function convertTable (table, align = 'left') {
  if (_.isPlainObject(table)) {
    table = _.entries(table)
  }
  if (table.every(row => Array.isArray(row))) {
    return { titles: [], values: table }
  }
  return {
    titles: Object.keys(_.sample(table)),
    values: table.map(_.values)
  }
}

function getColumnLength (table) {
  return _.zip(...table).map(column =>
    column.reduce((max, v) => Math.max(max, sizeof(v)), 0)
  )
}

function joinArray (array, spliter) {
  if (!spliter) return array
  const result = []
  for (var i = 0; i < array.length; ++i) {
    result.push(array[i])
    if (i !== array.length - 1) {
      result.push(spliter)
    }
  }
  return result
}

function partialCreatorOptions (layout, options) {
  const { gap, align, indent } = Object.assign({}, defaultOptions, options)
  const pad = getPadFunction(align)

  return (mapFn, theme) => {
    const [left, fill, spliter, right] = theme
    const space = fill.repeat(gap)
    return ' '.repeat(indent) + left +
      layout.map((N, i) => space + pad(mapFn(N, i, fill), N, fill) + space).join(spliter)
      + right
  }
}

function getCreators (layout, options) {
  const { showLine, tableTheme } = Object.assign({}, defaultOptions, options)
  const makeCreator = partialCreatorOptions(layout, options)

  const createSpliter = theme => makeCreator((N, i, fill) => fill.repeat(N), theme)
  const createContent = values => makeCreator((N, i) => values[i], tableTheme[3])

  const createTitle = titles => {
    if (titles.length) {
      return [
        createContent(titles),
        createSpliter(tableTheme[1])
      ]
    }
    return []
  }

  const createBody = values => joinArray(
    values.map(createContent),
    showLine ? createSpliter(tableTheme[2]) : null
  )

  return {
    createTop: () => createSpliter(tableTheme[0]),
    createTitle,
    createBottom: () => createSpliter(tableTheme[4]),
    createBody,
    createContent
  }
}

function printTable (rawTable, options) {
  const { titles, values } = convertTable(rawTable)
  const columnLength = getColumnLength([titles, ...values])
  const ctrs = getCreators(columnLength, options)

  const output = _.flatten([
    ctrs.createTop(),
    ctrs.createTitle(titles),
    ctrs.createBody(values),
    ctrs.createBottom()
  ]).join('\n')

  console.log(output)
}

module.exports = {
  printTable
}
