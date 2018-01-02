const stylus = require('stylus')
const weexStyler = require('weex-styler')
const styleValidator = require('weex-style-validator')

const ignoreStyleMessage = [
  /^NOTE\: unit \`px\` is not supported/,
  /^NOTE\: property value \`\#\w{3}\`/
]

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

function nodeToString (node) {
  let attrs = node.attrs.map(x => {
    return x.value ? `${x.name}="${x.value}"` : x.name
  }).join(' ')
  if (attrs.length > 0) {
    attrs = ' ' + attrs
  }
  return `<${node.tagName}${attrs}>`
}

async function lintStyle (cssText, node) {
  const results = []
  if (node && node.attrs) {
    if (!node.attrs.some(({ name }) => name === 'scoped')) {
      results.push({
        column: 8, line: 1,
        reason: 'ERROR: <style> must be scoped!',
        source: nodeToString(node)
      })
    }
    for (let i = 0; i < node.attrs.length; ++i) {
      const { name, value } = node.attrs[i]
      if (name === 'lang' && value === 'stylus') {
        results.push({
          column: 0, line: 1,
          reason: 'NOTE: this file is using stylus, the line number in <style> will be mismatch.',
          source: nodeToString(node)
        })
        cssText = await compileStylus(cssText)
        // console.log(cssText)
      }
    }
  }
  weexStyler.parse(cssText, (err, data) => {
    err && console.log(err)
    if (Array.isArray(data.log)) {
      data.log.forEach(log => {
        if (!ignoreStyleMessage.some(re => re.test(log.reason))) {
          try {
            log.source = (cssText.split(/\n|\t/)[log.line - 1]).slice(0, 60)
          } catch (e) {}
          results.push(log)
        }
      })
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
