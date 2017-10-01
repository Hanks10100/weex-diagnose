const weexStyler = require('weex-styler')
const styleValidator = require('weex-style-validator')

function lintStyle (cssText, node) {
  const results = []
  if (node && node.attrs) {
    if (!node.attrs.some(({ name, value }) => name === 'scoped')) {
      results.push({
        column: 8, line: 1,
        reason: '<style> must be scoped!'
      })
    }
  }
  weexStyler.parse(cssText, (err, data) => {
    err && console.log(err)
    if (Array.isArray(data.log)) {
      results.push(...data.log)
    }
    for (const selector in data.jsonStyle) {
      // TODO: validate selector

      // console.log(' => selector:', selector)
      // styleValidator.validateStyles(data.jsonStyle[selector])
    }
  })
  return results
}

module.exports = lintStyle
