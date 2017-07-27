const analyseVdom = require('./vdom')
const analyseLogs = require('./logs')
const analyseHistory = require('./history')

function analyser (records, options) {
  // console.log(' => run analyser')
  return new Promise((resolve, reject) => {
    const { history, vdom, logs } = records

    resolve({
      logs: analyseLogs(logs),
      vdom: analyseVdom(vdom),
      history: analyseHistory(history)
    })
  })
}


module.exports = analyser
