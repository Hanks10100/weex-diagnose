const { accumulate } = require('../utils')

function analyseHistory (history) {
  const { callNative, callJS, refresh } = history
  const callCount = {}
  if (Array.isArray(callNative)) {
    callNative.forEach(({ module, method, args }) => {
      accumulate(callCount, module)
      accumulate(callCount, `${module}.${method}`)
    })
  }

  return {
    records: callNative,
    summary: { callCount }
  }
}


module.exports = analyseHistory
