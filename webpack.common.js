const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'standard-loader',
        exclude: /(node_modules)/,
        options: {
          error: false,
          snazzy: true
        }
      },
      {
        test:/\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: {minimize: true, sourceMap: true} },
                { loader: 'sass-loader', options: {sourceMap: true} }]
        })
      },
      {
        include: /\.pug/,
        use: [ {loader: 'pug-loader'}]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new StyleLintPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main']
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/',
        to: 'assets/'
      }
    ])
  ]
}