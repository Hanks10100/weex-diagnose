function toString (param) {
  if (Array.isArray(param)) {
    return param.map(toString)
  }
  if (typeof param === 'object') {
    // if (param.type) return `<${param.type}>`
    return JSON.stringify(param)
  }
  if (typeof param === 'string') {
    return `"${param}"`
  }
  return param
}

function printHistory (history) {
  if (Array.isArray(history)) {
    console.log()
    history.forEach(({ module, method, args }) => {
      console.log(`${module}.${method}(${args.map(toString).join(', ')})`)
    })
  }
}

function generateVanillaCode (history) {
  let code = '// { "framework": "Vanilla" }\n\n'
  if (Array.isArray(history)) {
    history.forEach(({ module, method, args }) => {
      code += `sendTasks(id,[{module:'${module}',method:'${method}',args:${JSON.stringify(args)}}],-1)\n`
    })
  }
  return code
}

function printSummary (summary) {
  const { totalCount, totalDepth, callCount, layers, cssProps } = summary
  console.log(`\n => 页面节点总数: ${summary.totalCount}`)
  console.log(` => 页面最大深度: ${summary.totalDepth}`)
  console.log(` => 接口调用次数统计:`)
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

module.exports = function print (report, options = {}) {
  // console.log(generateVanillaCode(report.history))
  printHistory(report.history)
  printSummary(report.summary)
}
