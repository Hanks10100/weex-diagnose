const compile = require('../compile/index.js')

function lint (text, options = {}) {
  // console.log(' => lint:', text)
  return new Promise((resolve, reject) => {
    compile(text, options)
      .then(jsbundle => {
        resolve({ jsbundle })
      })
  })
}

module.exports = lint
