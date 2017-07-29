const _ = require('lodash')
const { sizeof, getPadFunction, mapObject } = require('../../utils')

// const defaultTableTheme = [
//   '    '.split(''),
//   '    '.split(''),
//   '    '.split(''),
//   '    '.split('')
// ]
// const defaultTableTheme = [
//   '+-++'.split(''),
//   '|-+|'.split(''),
//   '| +|'.split(''),
//   '+-++'.split(''),
// ]
const defaultTableTheme = [
  '┌─┬┐'.split(''),
  '├─┼┤'.split(''),
  '| ||'.split(''),
  '└─┴┘'.split('')
]
// const defaultTableTheme = [
//   '╔═╦╗'.split(''),
//   '╠═╬╣'.split(''),
//   '║ ║║'.split(''),
//   '╚═╩╝'.split('')
// ]


function getColumnLength (table) {
  return _.zip(...table).map(column =>
    column.reduce((max, v) => Math.max(max, sizeof(v)), 0)
  )
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

const defaultOptions = {
  gap: 2,
  indent: 0,
  align: 'left',
  tableTheme: defaultTableTheme
}

function getCreator (layout, options) {
  const { align, tableTheme } = Object.assign({}, defaultOptions, options)
  const makeCreator = partialCreatorOptions(layout, options)

  const createSpliter = theme => makeCreator((N, i, fill) => fill.repeat(N), theme)
  const createContent = values => makeCreator((N, i) => values[i], tableTheme[2])

  const createTitle = titles => {
    if (titles.length) {
      return [
        createContent(titles, tableTheme[2]),
        createSpliter(tableTheme[1])
      ]
    }
    return []
  }

  return {
    createTop: () => createSpliter(tableTheme[0]),
    createTitle,
    createBottom: () => createSpliter(tableTheme[3]),
    createContent
  }
}

function printTable (rawTable, options) {
  const { titles, values } = convertTable(rawTable)
  const columnLength = getColumnLength([titles, ...values])
  const { createTop, createTitle, createBottom, createContent } = getCreator(columnLength, options)

  const output = _.flatten([
    createTop(),
    createTitle(titles),
    values.map(createContent),
    createBottom()
  ]).join('\n')

  console.log(output)
}

module.exports = {
  printTable
}
