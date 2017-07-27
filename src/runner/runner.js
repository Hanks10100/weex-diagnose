const env = require('./env')
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
    const instance = this._context.createInstance(uniqueId(), code)
    // console.log(instance.document.body)
    const result = {
      state: 'success',
      // type: 'Vue',
      history: clonePlainObject(this._history),
      instance
    }
    this._history = []
    return result
  }
}

module.exports = WeexNodeRunner
