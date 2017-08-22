const _ = require('lodash')
const { getContent } = require('./utils')
const compiler = require('./compiler')
const runner = require('./runner')
const Analyser = require('./analyser')
const report = require('./reporter')

const defaultOptions = {
  src: null,
  code: null,
  count: 1,
  packages: {
    'weex-vue-framework': null,
    'weex-js-runtime': null
  }
}

// run single task
function runTask (task, opt) {
  const options = Object.assign({}, opt)
  if (_.isString(task)) {
    options.src = task
  }
  if (_.isPlainObject(task)) {
    Object.assign(options, defaultOptions, task)
  }

  const { src, code } = options
  if (!src && !code) {
    console.log(' => invalid task')
    return null
  }

  const analyser = new Analyser(options)
  return new Promise(resolve => {
    if (code) {
      return resolve(code)
    }
    return resolve(
      getContent(src, options).then(text => compiler(text, analyser, options))
    )
  }).then(code => runner(code, analyser, options))
    .then(result => {
      analyser.takeRecord('runner', result)
      return report(analyser.getResult(), options)
    })
}

// entry
function diagnose (tasks, options = {}) {
  if (Array.isArray(tasks)) {
    return Promise.all(tasks.map(task => runTask(task, options)))
  }
  return start(tasks, options)
}

module.exports = diagnose
