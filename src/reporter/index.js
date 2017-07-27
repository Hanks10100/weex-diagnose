const jsonfile = require('jsonfile')
const textReporter = require('./text/print')
const jsonReporter = require('./json')

class Reporter {
  constructor (options = {}) {
    this._options = options
    this._currentReporter = textReporter
    switch (options.type) {
      case 'text': this._currentReporter = textReporter; break;
      case 'json': this._currentReporter = jsonReporter; break;
      // case 'html': this._currentReporter = htmlReporter; break;
    }
  }

  report (result) {
    return this._currentReporter(result, this._options)
  }
}

module.exports = Reporter
