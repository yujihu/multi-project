'use strict'
const path = require('path')
const projectConfig = require('./projectConfig.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  entry: projectConfig.srcPath + 'main.js',
  output: {
    filename: 'js/[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, projectConfig.distPath),
    publicPath: projectConfig.publicPath // 上线时配置的是cdn的地址
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
            }
          }
        ],
        include: resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.scss/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: resolve('src'),
      },
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css'
    })
  ]
}
