'use strict'
const projectConfig = require('./projectConfig.json')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    contentBase: projectConfig.srcPath,
    disableHostCheck: true // 允许配置host
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      template: projectConfig.srcPath + 'index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
})
