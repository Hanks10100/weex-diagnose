const stylus = require('stylus')
const weexStyler = require('weex-styler')
const styleValidator = require('weex-style-validator')

async function compileStylus (source) {
  return new Promise((resolve, reject) => {
    stylus.render(source, { filename: 'whatever.css' }, (err, css) => {
      if (err) {
        reject(err)
      }
      resolve(css)
    })
  })
}

async function lintStyle (cssText, node) {
  const results = []
  if (node && node.attrs) {
    if (!node.attrs.some(({ name }) => name === 'scoped')) {
      results.push({
        column: 8, line: 1,
        reason: 'ERROR: <style> must be scoped!'
      })
    }
    for (let i = 0; i < node.attrs.length; ++i) {
      const { name, value } = node.attrs[i]
      if (name === 'lang' && value === 'stylus') {
        results.push({
          column: 0, line: 1,
          reason: 'NOTE: this file is using stylus, the line number in <style> will be mismatch.'
        })
        cssText = await compileStylus(cssText)
        // console.log(cssText)
      }
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
