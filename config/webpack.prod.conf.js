'use strict'
const projectConfig = require('./projectConfig.json')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        parallel: 4
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      template: projectConfig.srcPath + 'index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin()
  ]
})
