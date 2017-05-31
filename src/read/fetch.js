function decode (url) {
  return url
}

function fetch (url, callback) {
  const realUrl = decode(url)
  return callback(realUrl)
}

module.exports = fetch
