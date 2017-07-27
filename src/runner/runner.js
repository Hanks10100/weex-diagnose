const env = require('./env')
const modules = require('./modules')
const components = require('./components')
const { clonePlainObject, uniqueId } = require('../utils')

class WeexNodeRunner {
  constructor (frameworks, runtime, services) {
    this._history = []
    this._logs = []
    this.mockGlobalAPI()

    const { init, config } = runtime
    config.frameworks = frameworks

    for (const serviceName in services) {
      runtime.service.register(serviceName, services[serviceName])
    }

    // runtime.freezePrototype()
    // runtime.setNativeConsole()

    // init frameworks
    this._context = init(config)

    this._context.registerModules(modules)
    this._context.registerComponents(components)
  }

  mockGlobalAPI () {
    global.callNative = env.mockCallNative(_task => {
      const task = clonePlainObject(_task)
      task.timestamp = Date.now()
      this._history.push(task)
    })
    global.WXEnvironment = env.mockWXEnvironment()
    Object.assign(console, env.mockConsole((type, ...args) => {
      this._logs.push({
        type,
        timestamp: Date.now(),
        text: args.join(' ')
      })
    }))
  }

  execute (code) {
    const createInstance = this._context.createInstance
    return new Promise((resolve, reject) => {
      let instance = null
      try {
        instance = createInstance.call(null, uniqueId(), code)
      } catch (e) {
        this.reset()
        // console.log(` => catch in execute`)
        const result = this.standardizeResult(instance)
        result.exception = e
        reject(result)
      }
      if (instance) {
        setTimeout(() => {
          const result = this.standardizeResult(instance)
          this.reset()
          resolve(result)
        }, 100)
      }
    })
  }

  reset () {
    env.resetConsole()
    this._history = []
    this._logs = []
  }

  standardizeResult (instance) {
    console.log(` => standardize result`)
    const result = {
      logs: clonePlainObject(this._logs),
      history: clonePlainObject(this._history)
    }
    if (instance && instance.document) {
      result.vdom = clonePlainObject(instance.document.body)
    }
    return result
  }
}

module.exports = WeexNodeRunner
