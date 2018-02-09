const _ = require('lodash')
const { getContent } = require('./utils')
const compiler = require('./compiler')
const linter = require('./linter')
const runner = require('./runner')
const Analyser = require('./analyser')
const report = require('./reporter')
const walk = require('./walk')
const intercept = require("intercept-stdout");

let captured_message = [];
const defaultOptions = {
  src: null,
  code: null,
  iteration: 1,
  packages: {}
}

// entry
async function diagnose (tasks, sharedOptions = {}) {
  const options = standardizeOptions(tasks, sharedOptions)
  const reports = []
  for (let i = 0; i < options.length; ++i) {
    const results = []
    console.log(` => [diagnose] ${options[i].src}`)
    for (let iter = 1; iter <= options[i].iteration; ++iter) {
      // if (options[i].iteration > 1) {
      //   console.log(`    iteration ${iter}`)
      // }
      // captures stdout and/or stderr
      let unhook_intercept = intercept(function(msgs) {
        captured_message.push(msgs);
      });
      let res = await runTask(options[i]);
      res['messages'] = captured_message;

      // restore captures task.
      unhook_intercept();
      captured_message = [];

      results.push(res)
    }
    reports.push(results)
  }
  report(reports, options)
  return reports
}

async function runTask (options = {}) {
  const analyser = new Analyser(options)

  if (options.isZebra) {
    const text = await getContent(options.src, options)
    analyser.takeRecord('syntax', await linter(text, options))
    return report(analyser.getResult(), options)
  }

  if (!options.code) {
    try {
      const text = await getContent(options.src, options)
      analyser.takeRecord('syntax', await linter(text, options))
      options.code = await compiler(text, analyser, options)
    } catch (err) {
      console.log(`Faild to compile!`)
      console.log(err)
    }
  }
  try {
    const result = await runner(options.code, analyser, options)
    analyser.takeRecord('runner', result)
  } catch (err) {
    console.log(`Faild to run the code!`)
    console.log(err)
  }

  return analyser.getResult()
}

function standardizeOptions (task, sharedOptions = {}) {
  if (!task) return
  if (Array.isArray(task)) {
    return _.flatten(task.map(t => standardizeOptions(t, sharedOptions)))
  }
  const entryPath = _.isString(task) ? task : (_.isPlainObject(task) ? (task.src || sharedOptions.src) : '')
  if (!entryPath) {
    return null
  }
  return walk(entryPath).map(filePath => {
    const options = Object.assign({}, defaultOptions, sharedOptions)
    if (_.isPlainObject(task)) {
      Object.assign(options, task)
    }
    options.src = filePath
    return options
  })
}

module.exports = diagnose
