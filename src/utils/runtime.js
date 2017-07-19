const jsfm = require('weex-js-runtime')
const Vue = require('weex-vue-framework')
const { Runtime, Instance } = require('weex-vdom-tester')

jsfm.init()
jsfm.freezePrototype()

setupNativeEnv(global)

// TODO: mock global APIs
function setupNativeEnv (context) {
  context.WXEnvironment = {
    weexVersion: '',
    platform: 'Node.js',
    osVersion: '',
    appGroup: '',
    appName: '',
    appVersion: '',
    deviceWidth: 1080,
    deviceHeight: 1920
  }
  context.getJSFMVersion = function () {
    return 'x'
  }
}

function prepareRuntime () {
  jsfm.setNativeConsole()
  jsfm.setNativeTimer()

  let sendTasksHandler = function () {}
  jsfm.config.sendTasks = jsfm.config.Document.handler = function (...args) {
    sendTasksHandler.apply(null, args)
  }
  Vue.init(jsfm.config)
  const runtime = new Runtime(Vue)
  sendTasksHandler = function () {
    runtime.target.callNative.apply(runtime.target, arguments)
  }
  return runtime
}

function resetRuntime () {
  jsfm.resetNativeConsole()
  jsfm.resetNativeTimer()
  delete jsfm.config.Document.handler
  Vue.reset()
}

function createInstance (code) {
  const instance = new Instance(prepareRuntime())
  if (typeof code === 'string') {
    instance.$create(code)
  }
  return instance
}

module.exports = {
  prepareRuntime,
  resetRuntime,
  createInstance
}
