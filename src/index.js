const read = require('./fetch')
const compiler = require('./compiler')
const runner = require('./runner')
const analyser = require('./analyser')
const reporter = require('./reporter')

// entry
function start (filePath, options = {}) {
  return read(filePath, options)
    .then(text => compiler(text, options))
    .then(code => runner(code, options))
    .then(result => analyser(result, options))
    .then(report => reporter(report, options))
}

module.exports = start
