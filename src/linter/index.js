const cheerio = require('cheerio')
const lintScript = require('./script')
const lintStyle = require('./style')
const lintTemplate = require('./template')
const parse5 = require('parse5')

function linter (code, options) {
  // console.log(code)
  const $ = cheerio.load(code)
  const template = {}

  const doc = parse5.parseFragment(code, {
    treeAdapter: parse5.treeAdapters.default,
    locationInfo: true
  })
  const style = []
  const script = []
  doc.childNodes.forEach(node => {
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
        messages: lintStyle(content, node)
      })
    }

    if (node.nodeName === 'script') {
      script.push({
        location: { line, column, start, end },
        messages: lintScript(content, node)
      })
    }

    if (node.nodeName === 'template') {
      template.location = { line, column, start, end }
      template.messages = lintTemplate($('template').html(), node)
    }
  })

  return { style, script, template }
}

module.exports = linter
