const path = require('path')
const diagnose = require('../../src')
const compare = require('../../src/reporter/compare')

async function compareBundle(bundles) {
  let results = []
  for (let i = 0; i < bundles.length; ++i) {
    results.push(await diagnose(bundles[i], {
      iteration: 20,
      silent: true
    }))
  }
  compare(results)
  return results
}

// 对比 js bundle 的执行效率
compareBundle([
  'http://dotwe.org/vue/268e6dee6d3558fe4cc18a4279ef8c15',
  'http://dotwe.org/vue/72c820576d318ab3487a173f0fa42dba',
])
