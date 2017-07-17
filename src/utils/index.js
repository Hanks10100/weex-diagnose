const runtime = require('./runtime.js')

const URL_RE = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i
function isUrl (filePath) {
  return URL_RE.test(filePath)
}

function isVueBundle (text) {
  return true
}

function isVueFile (text) {
  return false
}

module.exports = Object.assign({
  isUrl,
  isVueBundle,
  isVueFile
}, runtime)
