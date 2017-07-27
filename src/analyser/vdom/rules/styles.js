const { forEachNode } = require('../../../utils')
const validator = require('weex-style-validator')

function validateStyles ($root) {
  const styleWarns = []
  forEachNode($root, (vnode, { depth, path }) => {
    validator.configure({
      silent: true,
      onfail (message) {
        styleWarns.push({
          type: 'style',
          component: vnode.type,
          depth,
          path,
          text: message.replace('[Style Validator]', '').trim()
        })
      }
    })
    validator.validateStyles(vnode.style)
  })
  // console.log(styleWarns)
  return styleWarns
}

module.exports = validateStyles
