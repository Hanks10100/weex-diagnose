const MemoryFileSystem = require('memory-fs')
const preLoadLoaders = require('./preload')

const mfs = new MemoryFileSystem()

preLoadLoaders(mfs, [
  'css-loader',
  'vue-style-loader',
  'weex-loader',
  'vue-loader'
])

module.exports = mfs
