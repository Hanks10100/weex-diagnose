const { init, config } = require('weex-js-runtime')
const Vue = require('weex-vue-framework')
const { Runtime, Instance } = require('weex-vdom-tester')

init()

function prepareRuntime () {
  let sendTasksHandler = function () {}
  config.sendTasks = config.Document.handler = function (...args) {
    sendTasksHandler.apply(null, args)
  }
  Vue.init(config)
  const runtime = new Runtime(Vue)
  sendTasksHandler = function () {
    runtime.target.callNative.apply(runtime.target, arguments)
  }
  return runtime
}

function resetRuntime () {
  delete config.Document.handler
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
