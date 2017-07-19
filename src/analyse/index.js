const compile = require('../compile/index.js')
const { isVueFile, isVueBundle, createInstance } = require('../utils')
const Analyser = require('./analyser.js')
const handleError = require('../exceptions')

function analyse (text, options = {}) {
  // console.log(' => analyse:', text)
  return new Promise((resolve, reject) => {
    if (isVueFile(text)) {
      compile(text, options)
        .then(jsbundle => analyseBundle(jsbundle, resolve))
    } else if (isVueBundle(text)) {
      analyseBundle(text, resolve)
    } else {
      reject('unknown format')
    }
  })
}

function analyseBundle (jsbundle, callback) {
  // console.log(' => run analyse', jsbundle)

  const analyser = new Analyser()

  analyser.analyseCode(jsbundle)

  let instance = null
  try {
    instance = createInstance(jsbundle)
  } catch (e) {
    handleError(e)
  }

  if (instance) {
    analyser.analyseHistory(instance.history)
    analyser.analyseDOMTree(instance.$getRoot())
  }

  return callback(analyser.getReport())
}

module.exports = analyse
