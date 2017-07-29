const printHistory = require('./history')
const printSummary = require('./summary')

function generateVanillaCode (history) {
  let code = '// { "framework": "Vanilla" }\n\n'
  if (Array.isArray(history)) {
    history.forEach(({ module, method, args }) => {
      code += `sendTasks(id,[{module:'${module}',method:'${method}',args:${JSON.stringify(args)}}],-1)\n`
    })
  }
  return code
}

module.exports = function textReporter (report, options = {}) {
  // console.log(generateVanillaCode(report.history))
  // printHistory(report.history)
  printSummary(report.summary)
}
