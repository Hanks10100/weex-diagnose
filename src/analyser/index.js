const analyseVdom = require('./vdom')
const analyseLogs = require('./logs')
const analyseHistory = require('./history')

function analyser (records, options) {
  // console.log(' => run analyser')
  const { history, vdom, logs } = records

  return {
    logs: analyseLogs(logs),
    vdom: analyseVdom(vdom),
    history: analyseHistory(history)
  }
}


module.exports = analyser
