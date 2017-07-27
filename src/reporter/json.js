const jsonfile = require('jsonfile')

function toJSON (result, options = {}) {
  if (options.output) {
    jsonfile.spaces = 2
    jsonfile.writeFile(options.output, result)
  }
}

module.exports = toJSON
