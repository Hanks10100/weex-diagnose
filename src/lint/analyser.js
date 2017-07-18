/**
 * 分析 callNative 历史记录，生成报告
 *  > callNative 的调用次数
 *  > 各种模块的调用次数
 *  > 各模块中各种方法的调用次数
 */
function analyzeHistory (history) {
  const { callNative, callJS, refresh } = history
  const summary = getSummary(callNative)
  // const sorted = Array.from(callNative).sort((a,b) => a.timestamp - b.timestamp)
  // console.log(sorted)
  printHistory(callNative)
  return summary
}

function printHistory (history) {
  if (Array.isArray(history)) {
    history.forEach(({ module, method, args }) => {
      console.log(`${module}.${method}(${args.join(', ')})`)
    })
  }
}

function analyzeDOMTree ($root) {
  // console.log($root)
  const summary = {
    totalCount: 0,
    totalDepth: 0
  }
  const layers = {}
  const nodeMap = {}
  const cssProps = {}

  forEachNodes($root, (node, { depth }) => {
    summary.totalCount++
    summary.totalDepth = Math.max(depth, summary.totalDepth)
    nodeMap[node.ref] = node
    if (layers[depth]) {
      layers[depth].push(node.ref)
    } else {
      layers[depth] = [node.ref]
    }

    for (const prop in node.style) {
      // console.log(node.style)
      accumulate(cssProps, prop)
    }
  })

  // console.log(cssProps)
  // printFeatures({summary, layers, nodeMap, cssProps})
  return {
    summary,
    layers,
    nodeMap
  }
}

function printFeatures (result) {
  const { summary, layers, nodeMap, cssProps } = result
  console.log(` => 页面节点总数: ${summary.totalCount}`)
  console.log(` => 页面最大深度: ${summary.totalDepth}`)
  // console.log(' => 节点各层节点数:')
  // for (const key in layers) {
  //   console.log(`      ${key}: ${layers[key].length}`)
  // }
  console.log(` => 样式属性的使用次数有:`)
  for (const prop in cssProps) {
    console.log(`      ${prop}: ${cssProps[prop]}`)
  }
}

function forEachNodes ($root, fn, options = { depth: 1 }) {
  fn.apply(null, [$root, options])
  if ($root.children && $root.children.length) {
    $root.children.forEach(node => {
      forEachNodes(node, fn, {
        depth: options.depth + 1
      })
    })
  }
}

function accumulate (object, key, step = 1) {
  object[key] = object[key] || 0
  object[key] += step
}

function getSummary (history) {
  const summary = {}
  if (Array.isArray(history)) {
    history.forEach(({ module, method, args }) => {
      accumulate(summary, module)
      accumulate(summary, `${module}.${method}`)
    })
  }
  return summary
}

module.exports = {
  analyzeHistory,
  analyzeDOMTree
}
