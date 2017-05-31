const compile = require('../compile/index.js')

function lint (text, options = {}) {
  return new Promise((resolve, reject) => {
    compile(text, options)
      .then(jsbundle => {
        resolve({ jsbundle })
      })
  })
}

module.exports = lint
