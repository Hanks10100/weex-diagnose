var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var memoryFs = require('./mfs');

/**
 * @description Transform Vue into JS Bundle
 * @param  {string} name
 * @param  {string} code
 * @param {string} JS Bundle type, 'web' or 'native'
 * @return {Object} Promise {resolve, reject}
 * @example
 * var vueTransformer = require('./vueTransformer')
 * var promise = vueTransformer.transform(name, code, 'web')
 * promise
 * 	.then(function (ret) {
 * 		console.log(ret.result)
 * 		console.log(ret.logs.join('\n'))
 * 		console.log(ret.type)
 * 	})
 * 	.catch(function (err) {
 * 	})
 */
function transform (name, code, type) {
	return new Promise (function (resolve, reject) {
		var directory, webEntryPoint, nativeEntryPoint, bundle, outputPoint, errLog
    var REGEXP1 = /^\s*<template>/
    var REGEXP2 = /^\s*<style>/
    // var REGEXP = /<template>(\S*|\s*)<\/template>/

		if (type !== 'web' && type !== 'native') {
			reject(new Error('Type Error!'))
      return;
		}

    if (!REGEXP1.test(code) && !REGEXP2.test(code)) {
			reject(new Error('Syntax Error! <template> tag should be at the beginning of the file.'))
      return;
		}

		if (!code) {
			resolve({
				logs: [],
				name: '',
				result: '',
				type: type
			})
      return;
		}

		directory = path.join(process.cwd(), 'raw')
		webEntryPoint = path.join(directory, name + '.web.entry.js')
		nativeEntryPoint = path.join(directory, name + '.native.entry.vue')
		vuePath = path.join(directory, name + '.vue')
		outputPoint = path.join(directory, name + '.' + type + '.js')

		if (type === 'web') {
			memoryFs.fs.writeFileSync(vuePath, code)
			memoryFs.fs.writeFileSync(webEntryPoint, `
				import App from './${name}.vue'

				App.el = '#root'
				new Vue(App)
			`)
		} else if (type === 'native') {
			memoryFs.fs.writeFileSync(nativeEntryPoint, code)
		}

		var vueConfig = {
			entry: webEntryPoint,
			output: {
				path: directory,
				filename: name + '.web.js'
			},
			module: {
				loaders: [{
						test: /\.vue(\?[^?]+)?$/,
						loaders: ['vue-loader']
					},
					{
						test: /\.js$/,
						loader: 'babel-loader',
						exclude: /node_modules/,
						query: {
							presets: ['es2015'],
      				plugins: ['transform-runtime']
						}
					}
				]
			},
			vue: {
  		  /**
  		   * important! should use postTransformNode to add $processStyle for
  		   * inline style prefixing.
  		   */
  		  compilerModules: [
  		    {
  		      postTransformNode: el => {
  		        el.staticStyle = `$processStyle(${el.staticStyle})`
  		        el.styleBinding = `$processStyle(${el.styleBinding})`
  		      }
  		    }
  		  ],
  		  postcss: [require('autoprefixer')()]
  		}
		}

		var bannerPlugin = new webpack.BannerPlugin('// { "framework": "Vue" }\n')

		var nativeConfig = {
			entry: path.resolve(nativeEntryPoint) + '?entry=#root',
			output: {
				path: directory,
				filename: name + '.native.js'
			},
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						exclude: /node_modules/,
						query: {
							presets: ['es2015'],
      				plugins: ['transform-runtime']
						}
					}, {
						test: /\.vue(\?[^?]+)?$/,
						loaders: ['weex-loader']
					}
				]
			},
			plugins: [bannerPlugin]
		}

		var config = type === 'web' ? vueConfig : nativeConfig

		var compiler = webpack(config)

		compiler.inputFileSystem = memoryFs.fs
		compiler.resolvers.normal.fileSystem = memoryFs.fs
		compiler.resolvers.context.fileSystem = memoryFs.fs
		compiler.outputFileSystem = memoryFs.fs

		try {
			compiler.run(function (err, stats) {

				if (type === 'web') {
					memoryFs.fs.unlink(webEntryPoint, function (err) {})
					memoryFs.fs.unlink(vuePath, function (err) {})
				} else if (type === 'native') {
					memoryFs.fs.unlink(nativeEntryPoint, function (err) {})
				}

				if (err) {
					rejecter(err)
				} else {
					errLog = stats.toJson().errors
					bundle = memoryFs.fs.readFileSync(outputPoint).toString()

					memoryFs.fs.unlink(outputPoint, function (err) {})

					resolve({
						logs: errLog,
						code: bundle
					})
				}
			})
		} catch (e) {
				if (type === 'web') {
					memoryFs.fs.unlink(webEntryPoint, function (err) {})
					memoryFs.fs.unlink(vuePath, function (err) {})
				} else if (type === 'native') {
					memoryFs.fs.unlink(nativeEntryPoint, function (err) {})
				}

			reject(e)
		}
	})
}

module.exports = transform
