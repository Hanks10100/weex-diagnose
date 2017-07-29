const { lengthOf, getPadFunction, mapObject } = require('../../utils')

// const borderTheme = [
//   '    '.split(''),
//   '    '.split(''),
//   '    '.split(''),
//   '    '.split('')
// ]
// const borderTheme = [
//   '+-++'.split(''),
//   '|-+|'.split(''),
//   '| +|'.split(''),
//   '+-++'.split(''),
// ]
const borderTheme = [
  '┌─┬┐'.split(''),
  '├─┼┤'.split(''),
  '| ||'.split(''),
  '└─┴┘'.split('')
]
// const borderTheme = [
//   '╔═╦╗'.split(''),
//   '╠═╬╣'.split(''),
//   '║ ║║'.split(''),
//   '╚═╩╝'.split('')
// ]

function indentString (string, indent) {
  return String(string).split(/[\r\n]+/).map(s => ' '.repeat(indent) + s).join('\n')
}

function parseTable (table) {
  const columnLength = []
  table.forEach(row => {
    row.forEach((v, i) => {
      columnLength[i] = Math.max(columnLength[i] || 0, lengthOf(v))
    })
  })
  return columnLength
}

function convertTable (table, align = 'left') {
  const props = []
  const result = table.map((row, i) => {
    if (Array.isArray(row)) return row
    const values = []
    for (const key in row) {
      if (i === 0) { props.push(key) }
      values.push(row[key])
    }
    return values
  })
  if (props.length) result.unshift(props)
  return result
}

function generateLine (array, mapFn, gap, theme) {
  const [left, fill, spliter, right] = theme
  const space = fill.repeat(gap)
  return `${left}` +
    array.map((N, i) => space + mapFn(N, i, fill) + space).join(spliter)
    + `${right}`
}

const defaultOptions = {
  gap: 2,
  indent: 0,
  align: 'left',
}
function printTable (rawTable, options) {
  const { gap, align, indent } = Object.assign({}, defaultOptions, options)
  const pad = getPadFunction(align)

  const formattedTable = convertTable(rawTable)
  const columnLength = parseTable(formattedTable)

  function generateBorder (theme) {
    return generateLine(columnLength, (N, i, fill) => fill.repeat(N), gap, theme)
  }

  const [top, border, content, bottom] = borderTheme.map(generateBorder)

  const [head, ...body] = formattedTable.map(
    row => generateLine(columnLength, (N, i) => pad(row[i], N), gap, borderTheme[2])
  )

  let output = [top, head, border, body.join('\n'), bottom].join('\n')

  // console.log(output)
  output = indentString(output, indent)
  console.log(output)
}

module.exports = {
  printTable
}
