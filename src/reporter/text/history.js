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

function printHistoryRecords (records) {
  // console.log(records)
  if (Array.isArray(records)) {
    console.log()
    records.forEach(({ module, method, args }) => {
      console.log(`${module}.${method}(${args.map(toString).join(', ')})`)
    })
  }
}

function printHistory (history = {}) {
  // console.log(history)
  const { records, summary } = history
  printHistoryRecords(records)
}

module.exports = printHistory
