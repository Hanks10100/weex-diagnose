const read = require('./read')
const lint = require('./lint')
const reporter = require('./reporter')

// entry
function diagnose (filePath, options = {}) {
  return read(filePath, options)
    .then(text => lint(text, options))
    .then(result => reporter(result, options))
}

module.exports = diagnose
