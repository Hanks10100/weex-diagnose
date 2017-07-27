const frameworks = require('./frameworks')
const runtime = require('weex-js-runtime')
const WeexNodeRunner = require('./runner')

function handleError (error) {
  // console.log(` => handle error`)
  console.log(error)
}

function runner (jsbundle, callback) {
  // console.log(' => run runner')
  const records = {}
  const nodeRunner = new WeexNodeRunner(frameworks, runtime)

  return new Promise((resolve, reject) => {
    let result = null
    try {
      result = nodeRunner.execute(jsbundle)
    } catch (e) {
      handleError(e)
      records.exception = e
    }

    if (result) {
      Object.assign(records, {
        logs: result.logs,
        history: result.history,
        vdom: result.vdom
      })
    }

    resolve(records)
  })
}

module.exports = runner
