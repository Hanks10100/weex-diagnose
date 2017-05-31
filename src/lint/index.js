const compile = require('../compile/index.js')

function lint (text, configs) {
  return new Promise((resolve, reject) => {
    compile(text, configs)
      .then(jsbundle => {
        resolve({ jsbundle })
      })
  })
}

module.exports = lint
