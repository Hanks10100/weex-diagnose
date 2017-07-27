const { forEachNode } = require('../../../utils')

function validateNode ($root) {
  const warnings = []
  forEachNode($root, (vnode) => {
    // TODO
  })
  // console.log(warnings)
  return warnings
}

module.exports = validateNode
