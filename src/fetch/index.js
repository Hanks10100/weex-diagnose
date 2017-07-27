const download = require('./download')
const readFile = require('./readfile')
const { isURL } = require('../utils')

function read (filePath, options = {}) {
  // console.log(' => read:', filePath)
  return new Promise((resolve, reject) => {
    if (isURL(filePath)) {
      download(filePath, resolve, reject)
    } else {
      readFile(filePath, resolve, reject)
    }
  })
}

module.exports = read
