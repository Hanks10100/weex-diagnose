const frameworks = require('./frameworks')
const runtime = require('weex-js-runtime')
const WeexNodeRunner = require('./runner')

function handleError (error) {
  console.log(` => handle error`)
  // console.log(error)
}

function runner (jsbundle, callback) {
  // console.log(' => run runner')
  // console.log(jsbundle)
  const nodeRunner = new WeexNodeRunner(frameworks, runtime)

  return nodeRunner.execute(jsbundle)
    .catch(result => {
      handleError(result)
      return result
    })

}

module.exports = runner
