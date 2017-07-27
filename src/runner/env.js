function mockCallNative (taskHook) {
  return function callNative (id, tasks) {
    if (Array.isArray(tasks)) {
      tasks.forEach(taskHook)
    }
  }
}

function mockWXEnvironment () {
  return {}
}

const originalConsole = Object.assign({}, console)
function mockConsole (hook) {
  return {
    log (...args) { hook('log', ...args) },
    warn (...args) { hook('warn', ...args) },
    error (...args) { hook('error', ...args) },
    info (...args) { hook('info', ...args) },
    debug (...args) { hook('debug', ...args) }
  }
}

function resetConsole () {
  Object.assign(console, originalConsole)
}

module.exports = {
  mockCallNative,
  mockWXEnvironment,
  mockConsole,
  resetConsole
}
