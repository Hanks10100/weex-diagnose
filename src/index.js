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
  packages: {}
}

async function executeOnce (task, options = {}) {
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
  const options = Object.assign({}, defaultOptions, sharedOptions)
  if (_.isString(task)) {
    options.src = task
  }
  if (_.isPlainObject(task)) {
    Object.assign(options, task)
  }
  if (!options.src && !options.code) {
    // console.log(' => invalid task')
    return null
  }
  const results = []
  console.log(` => [running] src: ${options.src}`)
  // if (Object.keys(options.packages || {}).length) {
  //   console.log(`              packages: ${JSON.stringify(options.packages)}`)
  // }
  for (let i = 1; i <= options.iteration; ++i) {
    if (options.iteration > 1) {
      console.log(`    iteration ${i}`)
    }
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
