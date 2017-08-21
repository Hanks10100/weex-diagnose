const { getContent } = require('./utils')
const compiler = require('./compiler')
const runner = require('./runner')
const Analyser = require('./analyser')
const report = require('./reporter')

// diagnose single file
function start (filePath, options = {}) {
  const analyser = new Analyser(options)
  return getContent(filePath, options)
    .then(text => compiler(text, analyser, options))
    .then(code => runner(code, analyser, options))
    .then(result => {
      analyser.takeRecord('runner', result)
      return report(analyser.getResult(), options)
    })
}

// entry
function diagnose (filePaths, options = {}) {
  if (Array.isArray(filePaths)) {
    return Promise.all(filePaths.map(fp => start(fp, options)))
  }
  return start(filePaths, options)
}

module.exports = diagnose
