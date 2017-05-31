const fs = require('fs')

function read (filePath, options = {}) {
  return new Promise((resolve, reject) => {
    resolve(String(filePath))
  })
}

module.exports = read
