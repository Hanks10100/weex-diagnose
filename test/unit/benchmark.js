const _ = require('lodash')
const path = require('path')
const diagnose = require('../../src')
const compare = require('../../src/reporter/compare')

async function runTest (examples) {
  const results = []
  for (let i = 0; i < examples.length; ++i) {
    results.push(await diagnose([
      // { packages: { 'weex-js-runtime': '0.21.7' } },
      { packages: { 'weex-js-runtime': '0.21.8' } },
      { packages: { 'weex-js-runtime': '0.21.9' } },
      { /* current version */ }
    ], {
      src: examples[i],
      iteration: 20,
      silent: true
    }))
  }

  results.forEach(reports => {
    compare(_.takeRight(reports, 2))
  })

  return results
}

runTest([
  path.resolve(__dirname, './cases/deep-100.js'),
  // path.resolve(__dirname, './cases/deep-200.js'),
  // path.resolve(__dirname, './cases/deep-800.js'),

  path.resolve(__dirname, './cases/flatten-30.js'),
  // path.resolve(__dirname, './cases/flatten-50.js'),
  // path.resolve(__dirname, './cases/flatten-75.js'),

  path.resolve(__dirname, './cases/nested-8.js'),
  // path.resolve(__dirname, './cases/nested-10.js'),
  // path.resolve(__dirname, './cases/nested-12.js'),
  // path.resolve(__dirname, './cases/nested-15.js') // don't use this
])
