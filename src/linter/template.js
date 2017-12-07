const templateCompiler = require('weex-template-compiler')

const ignoerTemplateMessage = [
  /^tag \<img\> has no matching end tag/
]

function lintTemplate (tpl, node) {
  // console.log(` => lint template`, tpl)
  const warns = []
  const compiled = templateCompiler.compile(tpl, {
    warn (message) {
      if (!ignoerTemplateMessage.some(re => re.test(message))) {
        warns.push(message)
      }
    }
  })
  // console.log(compiled)
  return warns
}

module.exports = lintTemplate
