const _ = require('lodash')
const { getContent } = require('./utils')
const compiler = require('./compiler')
const runner = require('./runner')
const Analyser = require('./analyser')
const report = require('./reporter')

const defaultOptions = {
  src: null,
  code: null,
  iteration: 1,
  packages: {
    'weex-vue-framework': null,
    'weex-js-runtime': null
  }
}

async function executeOnce (task, options) {
  // console.log(` => run task ${options.src}`)
  const analyser = new Analyser(options)

  if (!options.code) {
    const text = await getContent(options.src, options)
    options.code = await compiler(text, analyser, options)
  }

  const result = await runner(options.code, analyser, options)

  analyser.takeRecord('runner', result)
  return report(analyser.getResult(), options)
}

// run single task
async function runTask (task, sharedOptions) {
  const options = Object.assign({}, sharedOptions)
  if (_.isString(task)) {
    options.src = task
  }
  if (_.isPlainObject(task)) {
    Object.assign(options, defaultOptions, task)
  }
  if (!options.src && !options.code) {
    // console.log(' => invalid task')
    return null
  }
  const results = []
  let N = options.iteration || 1
  while (N--) {
    results.push(await executeOnce (task, options))
  }
  return results
}

// entry
async function diagnose (tasks, sharedOptions = {}) {
  if (Array.isArray(tasks)) {
    const reports = []
    for (let i = 0; i < tasks.length; ++i) {
      reports.push(await runTask(tasks[i], sharedOptions))
    }
    return reports
  }
  return await runTask(tasks, sharedOptions)
}

module.exports = diagnose
