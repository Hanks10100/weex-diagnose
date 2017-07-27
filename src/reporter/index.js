const jsonfile = require('jsonfile')
const print = require('./print')

function report (result, options = {}) {
  console.log(' => run report')
  return new Promise((resolve, reject) => {
    if (!options.silent) {
      print(result, options)
    }
    if (options.output) {
      jsonfile.spaces = 2
      jsonfile.writeFile(options.output, result, () => {
        resolve({ result })
      })
    }
  })
}

module.exports = report
