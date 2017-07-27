const read = require('./fetch')
const compiler = require('./compiler')
const runner = require('./runner')
const analyser = require('./analyser')
const Reporter = require('./reporter')

// entry
function start (filePath, options = {}) {
  return read(filePath, options)
    .then(text => compiler(text, options))
    .then(code => runner(code, options))
    .then(result => {
      const reporter = new Reporter(options)
      return reporter.report(analyser(result, options))
    })
}

module.exports = start
