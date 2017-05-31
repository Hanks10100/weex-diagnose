const webpack = require('webpack')

const bannerPlugin = new webpack.BannerPlugin({
  banner: '// { "framework": "Vue" }\n',
  raw: true
})

module.exports = {
  entry: '/index.vue',
  output: {
    filename: 'output.js',
    path: '/dist'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'weex-loader'
    }]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
    bannerPlugin
  ]
}
