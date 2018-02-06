const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new CopyWebpackPlugin([{
      context: 'src',
      from: 'assets/*.*',
      to: './'
    }])
  ]
});
