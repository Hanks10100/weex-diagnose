const { accumulate } = require('../utils')

function parseLogText (text) {
}

function analyseLogs (logs) {
  // console.log(` => analyse logs`)
  const summary = {}
  const records = {}
  if (Array.isArray(logs)) {
    logs.forEach(log => {
      const type = log.type
      accumulate(summary, type)
      records[type] = records[type] || []
      records[type].push(log)
      // console.log(log.text)
    })
  }
  return { records, summary }
}

module.exports = analyseLogs
