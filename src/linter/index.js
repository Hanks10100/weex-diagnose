const cheerio = require('cheerio')
const CLIEngine = require('eslint').CLIEngine
const eslintConfigs = require('../compiler/configs/eslintrc.js')
const weexStyler = require('weex-styler')
const styleValidator = require('weex-style-validator')
const templateCompiler = require('weex-template-compiler')

const ignoreStyleMessage = [
  /^NOTE\: unit \`px\` is not supported/,
  /^NOTE\: property value \`\#\w{3}\`/
]

const ignoerTemplateMessage = [
  /^tag \<img\> has no matching end tag/
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
          console.log(`\n errors in <style>`)
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

function lintScript ($script) {
  const cli = new CLIEngine(eslintConfigs)
  // console.log($script)
  const attrs = $script.attribs
  const jscode = $script.children[0].data
  // console.log(attrs)
  // console.log(jscode)
  const { results } = cli.executeOnText(jscode)

  if (results.length && results[0].messages.length) {
    console.log(`\n errors in <script>`)
  }

  results.forEach(({ messages }) => {
    messages.forEach(record => {
      console.log(`    ${record.line}:${record.column} ${record.message}`)
    })
  })
}

function lintTemplate (tpl) {
  const warns = []
  const { ast, render } = templateCompiler.compile(tpl, {
    warn (message) {
      if (!ignoerTemplateMessage.some(re => re.test(message))) {
        warns.push(message)
      }
    }
  })

  if (warns.length) {
    console.log(`\n errors in <template>`)
    warns.forEach(message => {
      console.log(`    ${message}`)
    })
  }
}


function linter (code, options) {
  // console.log(code)
  const $ = cheerio.load(code)
  Array.from($('style')).forEach($style => lintStyle($style))
  Array.from($('script')).forEach($script => lintScript($script))
  lintTemplate($('template').html())
  console.log(`\n\n`)
}

module.exports = linter
