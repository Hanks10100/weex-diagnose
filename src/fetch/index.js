const download = require('./download')
const readFile = require('./readfile')
const { isUrl } = require('../utils')

function read (filePath, options = {}) {
  // console.log(' => read:', filePath)
  return new Promise((resolve, reject) => {
    if (isUrl(filePath)) {
      download(filePath, resolve, reject)
    } else {
      readFile(filePath, resolve, reject)
    }
  })
}

module.exports = read
