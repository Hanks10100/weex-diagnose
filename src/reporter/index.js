const jsonfile = require('jsonfile')
const textReporter = require('./text')
const jsonReporter = require('./json')

function report (result, options) {
  // console.log(` => start report`, result)
  let currentReporter = textReporter
  switch (options.type) {
    case 'text': currentReporter = textReporter; break;
    case 'json': currentReporter = jsonReporter; break;
    // case 'html': this.currentReporter = htmlReporter; break;
  }

  return textReporter(result, options)
}

module.exports = report
