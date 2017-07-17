
const URL_RE = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i
function isUrl (filePath) {
  return URL_RE.test(filePath)
}

function isVueBundle (text) {
  return false
}

function isVueFile (text) {
  return true
}

module.exports = {
  isUrl,
  isVueBundle,
  isVueFile
}
