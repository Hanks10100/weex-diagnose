const { forEachNode } = require('../../../utils')

const childrenTypes = {
  list: ['cell', 'header', 'refresh', 'loading']
}

function validateRelation ($root) {
  const relationWarns = []
  forEachNode($root, (vnode, { parent, depth, path }) => {
    if (parent) {
      const supportedType = childrenTypes[parent.type]
      if (Array.isArray(supportedType) && supportedType.indexOf(vnode.type) === -1) {
        relationWarns.push({
          type: 'relation',
          component: vnode.type,
          depth,
          path,
          text: `<${vnode.type}> can't be the direct child of <${parent.type}>`
        })
      }
    }
  })
  // console.log(relationWarns)
  return relationWarns
}

module.exports = validateRelation
