const formatter = require('./formatter')
const { printTable } = require('./print')
const { objectToArray } = require('../../utils')
const propsLabel = require('./labels')

function printSummary (summary) {
  // console.log(` => print summary`, summary)
  const { callCount, layers, cssProps } = summary
  // console.log('summary', Object.keys(summary))

  const table = []
  for (const key in propsLabel) {
    if (summary[key]) {
      const { label, type } = propsLabel[key]
      table.push({
        label,
        value: formatter(type, summary[key])
      })
    }
  }

  // printTable(table, { align: 'right' })
  table.forEach(({ label, value }) => {
    console.log(` => ${label}: ${value}`)
  })

  console.log(`\n => 接口调用次数统计:`)
  // printTable(callCount, { indent: 4 })
  for (const key in callCount) {
    console.log(`      ${key}: ${callCount[key]}`)
  }
  // console.log(' => 各层节点数:')
  // for (const key in layers) {
  //   console.log(`      ${key}: ${layers[key].length}`)
  // }
  // console.log(` => 样式属性的使用次数有:`)
  // for (const prop in cssProps) {
  //   console.log(`      ${prop}: ${cssProps[prop]}`)
  // }
}

module.exports = printSummary
