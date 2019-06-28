'use strict'
const projectConfig = require('./projectConfig.json')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    contentBase: projectConfig.srcPath,
    disableHostCheck: true
  },
  devtool: 'cheap-module-eval-source-map'
})
