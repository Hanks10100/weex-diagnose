const fs = require('fs')

function read (filePath, configs) {
  return new Promise((resolve, reject) => {
    resolve(String(filePath))
  })
}

module.exports = read
