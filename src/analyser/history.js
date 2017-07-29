const { accumulate, sizeof } = require('../utils')

function analyseHistory (history) {
  // console.log(` => analyse history`)
  const summary = {
    messageSize: 0,
    timecost: 0,
    callCount: {}
  }
  if (Array.isArray(history)) {
    let minTime = Number.MAX_VALUE
    let maxTime = Number.MIN_VALUE
    history.forEach(({ module, method, args, time }) => {
      if (module === 'dom') {
        minTime = Math.min(minTime, time)
        maxTime = Math.max(maxTime, time)
      }
      summary.messageSize += sizeof(args)
      accumulate(summary.callCount, module)
      accumulate(summary.callCount, `${module}.${method}`)
    })
    summary.timecost = maxTime - minTime
  }

  return {
    records: history,
    summary
  }
}


module.exports = analyseHistory
