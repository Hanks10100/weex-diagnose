const env = require('./env')
const modules = require('./modules')
const components = require('./components')
const { clonePlainObject, uniqueId } = require('../utils')

class WeexNodeRunner {
  constructor (frameworks, runtime, services) {
    this._history = []
    this.mockGlobalAPI()

    const { init, config } = runtime
    config.frameworks = frameworks

    for (const serviceName in services) {
      runtime.service.register(serviceName, services[serviceName])
    }

    // runtime.freezePrototype()
    runtime.setNativeConsole()

    // init frameworks
    this._context = init(config)

    this._context.registerModules(modules)
    this._context.registerComponents(components)
  }

  mockGlobalAPI () {
    global.callNative = env.mockCallNative(_task => {
      const task = clonePlainObject(_task)
      // console.log(`${task.module}.${task.method}`)
      task.timestamp = Date.now()
      this._history.push(task)
    })
    global.WXEnvironment = env.mockWXEnvironment()
  }

  execute (code) {
    const createInstance = this._context.createInstance
    const result = this.standardizeResult(
      createInstance.call(null, uniqueId(), code)
    )
    this._history = []
    return result
  }

  standardizeResult (instance) {
    return {
      // state: 'success',
      // type: 'Vue',
      history: clonePlainObject(this._history),
      vdom: clonePlainObject(instance.document.body)
    }
  }
}

module.exports = WeexNodeRunner
