
function isUrl (filePath) {
  return false
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
