const fs = require('fs')

function readFile (filePath, callback) {
  // console.log(' => readFile:', filePath)
  fs.readFile(filePath, 'utf8', (err, text) => {
    if (err) return console.log(err)
    callback(text)
  })
}

module.exports = readFile
