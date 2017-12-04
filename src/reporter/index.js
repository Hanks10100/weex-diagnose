const jsonfile = require('jsonfile')
const textReporter = require('./text')

function writeReports (reports, options = []) {
  let target = './report.json'
  const output = []
  options.forEach((opt, i) => {
    if (opt.output) {
      target = opt.output
      output.push(reports[i])
    }
  })
  // console.log(` => Write reports to`, target)
  jsonfile.spaces = 2
  return jsonfile.writeFile(target, output)
}

function report (reports = [], options = []) {
  // console.log(options)
  const standardReports = reports.map((x, i) => filterReport(x, options[i]))
  writeReports(standardReports, options)
  if (!options.silent) {
    // TODO: refactor text reporter
    standardReports.forEach((x, i) => {
      x.forEach(y => textReporter(y, options[i]))
    })
  }
  return standardReports
}

function filterReport (reports = [], options = {}) {
  reports.forEach(result => {
    delete result.history
    delete result.messages
    delete result.vdom
  })
  return reports
}

module.exports = report
