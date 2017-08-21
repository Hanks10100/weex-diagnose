const semver = require('semver')
const getFrameworks = require('./frameworks')
const WeexNodeRunner = require('./runner')
const { sizeof } = require('../utils')

function getWeexRuntime (version) {
  if (version) {
    const folder = `${semver.major(version)}.${semver.minor(version)}`
    return require(`weex-js-runtime-packages/${folder}/${version}`)
  }
  return require('weex-js-runtime')
}

function handleError (error) {
  console.log(` => handle error`)
  // console.log(error)
}

function runner (jsbundle, analyser) {
  // console.log(' => run runner')
  // console.log(jsbundle)
  analyser.takeRecord('bundleSize', sizeof(jsbundle))
  const runtime = getWeexRuntime('0.21.9')
  const frameworks = getFrameworks()
  const nodeRunner = new WeexNodeRunner(frameworks, runtime, {}, analyser)

  return nodeRunner.execute(jsbundle)
    .catch(result => {
      handleError(result)
      return result
    })

}

module.exports = runner
