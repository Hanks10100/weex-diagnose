const compile = require('../compile/index.js')
const { isVueFile, isVueBundle, createInstance } = require('../utils')
const { analyzeHistory, analyzeDOMTree } = require('./analyzer.js')

function lint (text, options = {}) {
  // console.log(' => lint:', text)
  return new Promise((resolve, reject) => {
    if (isVueFile(text)) {
      compile(text, options)
        .then(jsbundle => lintBundle(jsbundle, resolve))
    } else if (isVueBundle(text)) {
      lintBundle(text, resolve)
    } else {
      reject('unknown format')
    }
  })
}

function lintBundle (jsbundle, callback) {
  // console.log(' => run lint', jsbundle)

  const instance = createInstance(jsbundle)
  analyzeHistory(instance.history)
  analyzeDOMTree(instance.$getRoot())

  return callback({ errors: {} })
}

module.exports = lint
