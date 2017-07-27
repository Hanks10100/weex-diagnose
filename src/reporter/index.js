const jsonfile = require('jsonfile')
const print = require('./text/print')

function report (result, options = {}) {
  console.log(' => run report')
  if (!options.silent) {
    print(result, options)
  }
  if (options.output) {
    jsonfile.spaces = 2
    jsonfile.writeFile(options.output, result)
  }
}

module.exports = report
