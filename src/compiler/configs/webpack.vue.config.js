const webpack = require('webpack')

const bannerPlugin = new webpack.BannerPlugin({
  banner: '// { "framework": "Vue" }\n',
  raw: true
})

module.exports = (directory, entry) => ({
  entry: entry,
  output: {
    path: directory,
    filename: 'output.js'
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
  externals: {
    mui: true
  },
  plugins: [bannerPlugin]
})
