const { accumulate, forEachNode } = require('../../utils')

function getSummary ($root) {
  // console.log(` => get vdom summary`)
  let totalCount = 0
  let totalDepth = 0
  const layers = {}
  const nodeMap = {}
  const cssProps = {}

  forEachNode($root, (node, { depth }) => {
    totalCount++
    totalDepth = Math.max(depth, totalDepth)
    nodeMap[node.ref] = node

    if (layers[depth]) {
      layers[depth].push(node.ref)
    } else {
      layers[depth] = [node.ref]
    }

    for (const prop in node.style) {
      accumulate(cssProps, prop)
    }
  })

  return { totalCount, totalDepth, layers, cssProps }
}

module.exports = getSummary
