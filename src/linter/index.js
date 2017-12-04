const parse5 = require('parse5')
const lintScript = require('./script')
const lintStyle = require('./style')
const lintTemplate = require('./template')
const { isVueFile } = require('../utils')

async function linter (code, options) {
  const style = []
  const script = []
  const template = {}
  if (isVueFile(code)) {
    console.log(' => isVue', options.src)
    const doc = parse5.parseFragment(code, {
      treeAdapter: parse5.treeAdapters.default,
      locationInfo: true
    })
    for (let i = 0; i < doc.childNodes.length; ++i) {
      const node = doc.childNodes[i]
      let start = end = line = column = 0
      if (node.__location) {
        const __location = node.__location
        if (__location.startTag && __location.endTag) {
          start = __location.startTag.endOffset || 0
          end = __location.endTag.startOffset || 0
        }
        else {
          start = __location.startOffset || 0
          end = __location.endOffset || 0
        }
        line = __location.line
        column = __location.col
      }
      const content = code.substring(start, end)
      if (node.nodeName === 'style') {
        // console.log(node.nodeName)
        // console.log(line, column, start, end)
        style.push({
          location: { line, column, start, end },
          messages: await lintStyle(content, node)
        })
      }

      if (node.nodeName === 'script') {
        script.push({
          location: { line, column, start, end },
          messages: lintScript(content)
        })
      }

      if (node.nodeName === 'template') {
        template.location = { line, column, start, end }
        template.messages = lintTemplate(content, node)
      }
    }
  } else {
    script.push({
      location: { line: 0, column: 0, start: 0, end: 0 },
      messages: lintScript(code)
    })
  }
  return { style, script, template }
}

module.exports = linter
