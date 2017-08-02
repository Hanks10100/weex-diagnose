const _ = require('lodash')

function printLogList (type, logs) {
  console.log(` ------------------------------ ${type} ------------------------------`)
  if (Array.isArray(logs)) {
    logs.forEach(record => {
      console.log(record.text)
    })
  }
}

function printLogs (logGroup = {}) {
  printLogList('debug', logGroup.debug)
}

module.exports = printLogs
