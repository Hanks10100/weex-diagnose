function toString (param) {
  if (Array.isArray(param)) {
    return param.map(toString)
  }
  if (typeof param === 'object') {
    if (param.type) return `<${param.type}>`
    // return JSON.stringify(param)
  }
  if (typeof param === 'string') {
    return `"${param}"`
  }
  return param
}

function printHistory (history) {
  // console.log(history)
  if (Array.isArray(history)) {
    console.log()
    history.forEach(({ module, method, args }) => {
      console.log(`${module}.${method}(${args.map(toString).join(', ')})`)
    })
  }
}

module.exports = printHistory
