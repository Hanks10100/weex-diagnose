const VuePlugin = require('./plugin')

function mockCallNative (taskHook) {
  return function callNative (id, tasks) {
    if (Array.isArray(tasks)) {
      tasks.forEach(taskHook)
    }
  }
}

function mockWXEnvironment () {
  return {
    deviceWidth: 1080,
    deviceHeight: 1920,
  }
}

function injectVuePlugin (options, hook) {
  global.__INJECT_VUE__ = function (weex, Vue) {
    Vue.use(VuePlugin, options)
    hook && hook(weex, Vue)
  }
}

function removeVuePlugin () {
  delete global.__INJECT_VUE__
}

function mockConsole (hook) {
  return {
    log (...args) { hook('log', ...args) },
    warn (...args) { hook('warn', ...args) },
    error (...args) { hook('error', ...args) },
    info (...args) { hook('info', ...args) },
    debug (...args) { hook('debug', ...args) }
  }
}

const originalConsole = Object.assign({}, console)
function resetConsole () {
  Object.assign(console, originalConsole)
}

module.exports = {
  mockCallNative,
  mockWXEnvironment,
  injectVuePlugin,
  removeVuePlugin,
  mockConsole,
  resetConsole
}
