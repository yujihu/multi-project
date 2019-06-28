'use strict'
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
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
    new CleanWebpackPlugin()
  ]
})
