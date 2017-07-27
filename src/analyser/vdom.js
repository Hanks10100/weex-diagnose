const { accumulate } = require('../utils')

function forEachNode ($root, fn, options = { depth: 1 }) {
  fn.apply(null, [$root, options])
  if ($root.children && $root.children.length) {
    $root.children.forEach(node => {
      forEachNode(node, fn, {
        depth: options.depth + 1
      })
    })
  }
}

function analyseVdom ($root) {
  // console.log($root)
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

  return {
    summary: { totalCount, totalDepth, layers, cssProps }
  }
}

module.exports = analyseVdom
