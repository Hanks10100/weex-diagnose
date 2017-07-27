const frameworks = require('./frameworks')
const runtime = require('weex-js-runtime')
const WeexNodeRunner = require('./runner')


const { createInstance } = require('../utils')

function handleError (error) {
  console.log(` => handle error`)
  console.log(error)
}

function runner (jsbundle, callback) {
  console.log(' => run runner')
  const records = {}
  return new Promise((resolve, reject) => {
    let result = null
    try {


      const nodeRunner = new WeexNodeRunner(frameworks, runtime)
      result = nodeRunner.execute(jsbundle)







      // instance = createInstance(jsbundle)
    } catch (e) {
      handleError(e)
      records.exception = e
    }

    if (result) {
      Object.assign(records, {
        history: result.history,
        vdom: result.instance.document.body
      })
    }

    resolve(records)
  })
}

module.exports = runner
