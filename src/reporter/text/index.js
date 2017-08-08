const printLogs = require('./logs')
const printHistory = require('./history')
const printSummary = require('./summary')
const { printWarnings, printErrors } = require('./warnings')
const { writeFile } = require('../../utils')

function generateVanillaCode (history) {
  let code = '// { "framework": "Vanilla" }\n\n'
  if (Array.isArray(history)) {
    history.forEach(({ module, method, args }) => {
      if (module === 'dom' && method === 'createFinish') {
        return
      }
      code += `sendTasks([{module:'${module}',method:'${method}',args:${JSON.stringify(args)}}])\n`
    })
  }
  writeFile('./output.js', code)
  return code
}

module.exports = function textReporter (report, options = {}) {
  generateVanillaCode(report.history)
  printHistory(report.history)
  // printLogs(report.messages)
  printSummary(report.summary)
  printWarnings(report.warnings)
  printErrors(report.errors)
  return report
}
