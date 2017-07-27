const analyseVdom = require('./vdom')
const analyseHistory = require('./history')

function analyser (records, options) {
  console.log(' => run analyser')
  return new Promise((resolve, reject) => {
    const { history, vdom } = records

    resolve({
      vdom: analyseVdom(vdom),
      history: analyseHistory(history)
    })
  })
}


module.exports = analyser
