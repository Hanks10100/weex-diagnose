const read = require('./read')
const lint = require('./lint')
const reporter = require('./reporter')

// entry
function diagnose (filePath, configs) {
  return read(filePath, configs)
    .then(text => lint(text, configs))
    .then(result => reporter(result, configs))
}

module.exports = diagnose
