const analyseVdom = require('./vdom')
const analyseLogs = require('./logs')
const analyseHistory = require('./history')

function analyser (record, options) {
  // console.log(' => run analyser')
  const logs = analyseLogs(record.logs)
  const vdom = analyseVdom(record.vdom)
  const history = analyseHistory(record.history)

  return {
    history: history.records,
    logs: logs.records,
    summary: Object.assign({}, vdom.summary, history.summary),
    vdom: vdom
  }
}


module.exports = analyser
