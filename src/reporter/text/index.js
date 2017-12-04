const printLogs = require('./logs')
const printHistory = require('./history')
const printSummary = require('./summary')
const printSyntaxLint = require('./syntax')
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
  console.log(`\n\n\n => text report`, options.src)
  if (options.silent) {
    return report
  }
  // generateVanillaCode(report.history)
  // printSyntaxLint(report.syntax)
  // printHistory(report.history)
  // printLogs(report.messages)
  // printSummary(report.summary)
  printWarnings(report.warnings)
  printErrors(report.errors)
  return report
}
