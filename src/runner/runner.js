const _ = require('lodash')
const env = require('./env')
const modules = require('./modules')
const components = require('./components')
const { deepClone, microsecond, delay } = require('../utils')

class WeexNodeRunner {
  constructor (frameworks, runtime, services, analyser) {
    this._frameworks = frameworks
    this._runtime = runtime
    this._analyser = analyser
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
    env.polyfill()
    global.callNative = env.mockCallNative(_task => {
      const task = Object.assign({
        time: microsecond()
      }, _task)
      this._history.push(task)
    })
    global.WXEnvironment = env.mockWXEnvironment()
    env.injectVuePlugin({ analyser: this._analyser })
    Object.assign(console, env.mockConsole((level, ...args) => {
      this._logs.push({
        level,
        time: microsecond(),
        text: args.join(' ')
      })
    }))
  }

  async execute (code) {
    const createInstance = this._context.createInstance
    const destroyInstance = this._context.destroyInstance

    let instance = null
    const instanceId = _.uniqueId()
    try {
      instance = createInstance.call(null, instanceId, code)
    } catch (e) {
      this.reset()
      // console.log(` => catch in execute`)
      const result = this.standardizeResult(instance)
      result.exception = e
    }
    if (instance) {
      await delay(30)
      const result = this.standardizeResult(instance)
      destroyInstance(instanceId)
      this.reset()
      return result
    }
  }

  reset () {
    env.resetConsole()
    this._history = []
    this._logs = []
  }

  standardizeResult (instance) {
    // console.log(` => standardize result`)
    const result = {
      logs: deepClone(this._logs),
      history: deepClone(this._history)
    }
    if (instance && instance.document) {
      // console.log(Object.keys(instance))
      result.vdom = deepClone(instance.document.body || instance.document.documentElement)
    }
    return result
  }
}

module.exports = WeexNodeRunner
