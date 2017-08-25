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
  'http://dotwe.org/weex/e76b69e8308f9e7d4c357c8e7cca1df6',
  'http://dotwe.org/weex/993a57b338ae04e103734d09e53d1127',
])
