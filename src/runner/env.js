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

module.exports = {
  mockCallNative,
  mockWXEnvironment
}
