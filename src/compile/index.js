
function compile (text, options = {}) {
  console.log(' => compile', text)
  return new Promise((resolve, reject) => {
    resolve(String(text))
  })
}

module.exports = compile
