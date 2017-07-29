const read = require('./fetch')
const compiler = require('./compiler')
const runner = require('./runner')
const Analyser = require('./analyser')
const report = require('./reporter')

// entry
function start (filePath, options = {}) {
  const analyser = new Analyser(options)
  return read(filePath, options)
    .then(text => compiler(text, analyser, options))
    .then(code => runner(code, analyser, options))
    .then(result => {
      analyser.takeRecord('runner', result)
      return report(analyser.getResult(), options)
    })
}

module.exports = start
