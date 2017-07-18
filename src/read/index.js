const fetch = require('./fetch')
const readFile = require('./readFile')
const { isUrl } = require('../utils')

function read (filePath, options = {}) {
  // console.log(' => read:', filePath)
  return new Promise((resolve, reject) => {
    if (isUrl(filePath)) {
      fetch(filePath, resolve, reject)
    } else {
      readFile(filePath, resolve, reject)
    }
  })
}

module.exports = read
