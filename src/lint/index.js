const compile = require('../compile/index.js')
const { isVueFile, isVueBundle } = require('../utils')

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
  return callback({ errors: {} })
}

module.exports = lint
