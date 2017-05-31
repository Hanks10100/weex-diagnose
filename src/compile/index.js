
function compile (text, options = {}) {
  return new Promise((resolve, reject) => {
    resolve(String(text))
  })
}

module.exports = compile
