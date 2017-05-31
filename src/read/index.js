const fetch = require('./fetch')
const readFile = require('./readFile')
const { isUrl } = require('../utils')

function read (filePath, options = {}) {
  // console.log(' => read:', filePath)
  return new Promise((resolve, reject) => {
    if (isUrl(filePath)) {
      fetch(filePath, resolve)
    } else {
      readFile(filePath, resolve)
    }
  })
}

module.exports = read
