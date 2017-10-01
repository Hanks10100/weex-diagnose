const weexStyler = require('weex-styler')
const styleValidator = require('weex-style-validator')

function lintStyle ($style) {
  const results = []
  if ($style && $style.children) {
    const attrs = $style.attribs
    const cssText = $style.children[0].data
    if (!Object.prototype.hasOwnProperty.call(attrs, 'scoped')) {
      console.warn(`\n    <style> should be "scoped"!`)
    }
    weexStyler.parse(cssText, (err, data) => {
      err && console.log(err)
      if (Array.isArray(data.log)) {
        results.push(...data.log)
      }
      // for (const selector in data.jsonStyle) {
      //   console.log(' => selector:', selector)
      //   styleValidator.validateStyles(data.jsonStyle[selector])
      // }
    })
  }
  return results
}

module.exports = lintStyle
