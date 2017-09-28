const cheerio = require('cheerio')
const templateCompiler = require('weex-template-compiler')

const ignoerTemplateMessage = [
  /^tag \<img\> has no matching end tag/
]

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
    console.log(`\n    <template>`)
    warns.forEach(message => {
      console.log(`    ${message}`)
    })
  }
}

module.exports = lintTemplate
