const read = require('./read')
const analyse = require('./analyse')
const reporter = require('./reporter')

// entry
function diagnose (filePath, options = {}) {
  return read(filePath, options)
    .then(text => analyse(text, options))
    .then(result => reporter(result, options))
}

module.exports = diagnose
