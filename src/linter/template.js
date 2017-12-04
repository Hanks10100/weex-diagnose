const templateCompiler = require('weex-template-compiler')

const ignoerTemplateMessage = [
  /^tag \<img\> has no matching end tag/
]

function lintTemplate (tpl, node) {
  const warns = []
  const { ast, render } = templateCompiler.compile(tpl, {
    warn (message) {
      if (!ignoerTemplateMessage.some(re => re.test(message))) {
        warns.push(message)
      }
    }
  })

  return warns
}

module.exports = lintTemplate
