const webpack = require('webpack')
const MemoryFS = require('memory-fs')
const webpackConfig = require('./webpack.config.js')
const preLoadPackages = require('./preLoadPackages')

function createMemoryFS () {
  const mfs = new MemoryFS()
  mfs.mkdirpSync('/dist')
  preLoadPackages(mfs, [
    'weex-loader',
    'weex-vue-loader',
    'vue-loader',
    'style-loader',
    'vue-style-loader',
    'template-compiler'
  ])
  return mfs
}

function compile (text, options = {}) {
  // console.log(' => compile', text)
  const mfs = createMemoryFS()
  mfs.writeFileSync('/index.vue', text)
  const compiler = webpack(Object.assign({}, webpackConfig))

  compiler.inputFileSystem = mfs;
  compiler.outputFileSystem = mfs;
  compiler.resolvers.normal.fileSystem = compiler.inputFileSystem
  compiler.resolvers.context.fileSystem = compiler.inputFileSystem

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        // console.log(' => failed:', err)
        // console.log(stats.toString())
      }
      // console.log('compile finished !')
      // console.log(stats.toString())
      const content = mfs.readFileSync('/dist/output.js', 'utf8')
      resolve(content)
    })
  })
}

module.exports = compile
