const jsonfile = require('jsonfile')
const { getMessage } = require('./dict')
const print = require('./print')

function report (result, options = {}) {
  // console.log(' => run report')
  return new Promise((resolve, reject) => {
    const message = getMessage(result)
    if (!options.silent) {
      print(message, options)
    }
    if (options.json) {
      jsonfile.writeFile(options.json, message, () => {
        resolve({ result })
      })
    }
  })
}

module.exports = report
