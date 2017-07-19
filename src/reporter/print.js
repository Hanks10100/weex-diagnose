function toString (param) {
  if (Array.isArray(param)) {
    return param.map(toString)
  }
  if (typeof param === 'object') {
    if (param.type) return `<${param.type}>`
    return JSON.stringify(param)
  }
  return param
}

function printHistory (history) {
  if (Array.isArray(history)) {
    history.forEach(({ module, method, args }) => {
      console.log(`${module}.${method}(${args.map(toString).join(', ')})`)
    })
  }
}

function printSummary (summary) {
  const { totalCount, totalDepth, callCount, layers, cssProps } = summary
  console.log(`\n => 页面节点总数: ${summary.totalCount}`)
  console.log(` => 页面最大深度: ${summary.totalDepth}`)
  console.log(` => 接口调用次数统计:`)
  for (const key in callCount) {
    console.log(`    ${key}: ${callCount[key]}`)
  }
  console.log(' => 各层节点数:')
  for (const key in layers) {
    console.log(`      ${key}: ${layers[key].length}`)
  }
  console.log(` => 样式属性的使用次数有:`)
  for (const prop in cssProps) {
    console.log(`      ${prop}: ${cssProps[prop]}`)
  }
}

module.exports = function print (report, options = {}) {
  printHistory(report.history)
  printSummary(report.summary)
}
