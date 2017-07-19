const compile = require('../compile/index.js')
const { isVueFile, isVueBundle, createInstance } = require('../utils')
const { analyzeHistory, analyzeDOMTree } = require('./analyser.js')
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

  let instance = null
  try {
    instance = createInstance(jsbundle)
  } catch (e) {
    handleError(e)
  }

  if (instance) {
    analyzeHistory(instance.history)
    analyzeDOMTree(instance.$getRoot())
  }

  return callback({ errors: {} })
}

module.exports = analyse
