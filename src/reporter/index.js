const jsonfile = require('jsonfile')

function report (result, configs) {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile('output.json', result, () => {
      resolve({ result })
    })
  })
}

module.exports = report
