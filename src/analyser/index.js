const analyseVdom = require('./vdom')
const analyseLogs = require('./logs')
const analyseHistory = require('./history')
const analyseException = require('./exception')

function analyser (record, options) {
  // console.log(' => run analyser', Object.keys(record))
  const logs = analyseLogs(record.logs)
  const vdom = analyseVdom(record.vdom)
  const history = analyseHistory(record.history)
  const exception = analyseException(record.exception)

  return {
    history: history.records,
    logs: logs.records,
    summary: Object.assign({}, vdom.summary, history.summary),
    vdom: vdom
  }
}


module.exports = analyser
