const weexStyler = require('weex-styler')
const styleValidator = require('weex-style-validator')

const ignoreStyleMessage = [
  /^NOTE\: unit \`px\` is not supported/,
  /^NOTE\: property value \`\#\w{3}\`/
]

function lintStyle ($style) {
  if ($style && $style.children) {
    const attrs = $style.attribs
    const cssText = $style.children[0].data
    if (!Object.prototype.hasOwnProperty.call(attrs, 'scoped')) {
      console.warn(`\n    <style> should be "scoped"!`)
    }
    weexStyler.parse(cssText, (err, data) => {
      err && console.log(err)
      if (Array.isArray(data.log)) {
        if (data.log.length) {
          console.log(`\n    <style>`)
        }
        data.log.forEach(message => {
          if (!ignoreStyleMessage.some(re => re.test(message.reason))) {
            console.log(`    ${message.line}:${message.column} ${message.reason}`)
          }
        })
      }
      // for (const selector in data.jsonStyle) {
      //   console.log(' => selector:', selector)
      //   styleValidator.validateStyles(data.jsonStyle[selector])
      // }
    })
  }
}

module.exports = lintStyle
