const path = require('path')
const webpack = require('webpack')
const getWebpackConfig = require('../configs/webpack.vue.config.js')
const mfs = require('./mfs')

function setupCompiler (fileSystem, webpackConfig) {
  const compiler = webpack(webpackConfig)

  compiler.inputFileSystem = fileSystem
  compiler.resolvers.normal.fileSystem = fileSystem
  compiler.resolvers.context.fileSystem = fileSystem
  compiler.outputFileSystem = fileSystem

  return compiler
}

function transform (code) {
	return new Promise ((resolve, reject) => {
    const directory = path.join(process.cwd())
    const entryPoint = path.join(directory, 'entry.js')
    const outputPoint = path.join(directory, 'output.js')

    mfs.mkdirpSync(directory)
    mfs.writeFileSync(path.join(directory, 'App.vue'), code)
    mfs.writeFileSync(entryPoint, `
      import App from './App.vue'
      App.el = '#root'
      new Vue(App)
    `)

    const webpackConfig = getWebpackConfig(directory, entryPoint)
		const compiler = setupCompiler(mfs, webpackConfig)

		try {
			compiler.run((err, stats) => {
        mfs.unlink(entryPoint, () => {})
				if (err) {
					return rejecter(err)
				}

        const logs = stats.toJson().errors
        const code = mfs.readFileSync(outputPoint).toString()
        mfs.unlink(outputPoint, () => {})

        resolve({ logs, code })
			})
		} catch (e) {
      mfs.unlink(entryPoint, () => {})
			reject(e)
		}
	})
}

module.exports = transform
