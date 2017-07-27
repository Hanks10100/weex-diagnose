const { createInstance } = require('../utils')

function handleError (error) {
  console.log(` => handle error`)
  // console.log(error)
}

function runner (jsbundle, callback) {
  console.log(' => run analyser')
  return new Promise((resolve, reject) => {
    try {
      const instance = createInstance(jsbundle)
      resolve({
        history: instance.history,
        vdom: instance.$getRoot()
      })
    } catch (e) {
      handleError(e)
      reject({ e })
    }
  })
}

module.exports = runner
