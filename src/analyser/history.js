const { accumulate } = require('../utils')

function analyseHistory (history) {
  const callCount = {}
  if (Array.isArray(history)) {
    history.forEach(({ module, method, args }) => {
      accumulate(callCount, module)
      accumulate(callCount, `${module}.${method}`)
    })
  }

  return {
    records: history,
    summary: { callCount }
  }
}


module.exports = analyseHistory
