
const moduleProxy = {
  timer: {
    setTimeout (fn, ms) {
      return setTimeout(fn, ms)
    }
  }
}

function taskProxy (task = {}) {
  // const { method, args } = task
  // const proxy = moduleProxy[task.module]
  // if (proxy && proxy[method]) {
  //   console.log(task.module, method, args)
  //   return proxy[method].apply(null, args)
  // }
}

module.exports = taskProxy
