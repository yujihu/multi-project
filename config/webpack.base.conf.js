'use strict'
const path = require('path')
const glob = require('glob')
const projectConfig = require('./projectConfig.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => path.join(__dirname, '..', dir)

const htmlPluginArray = []

function getEntry() {
  const entry = {}
  const pages = glob.sync(projectConfig.srcPath + 'pages/**?/index.js')
  pages.forEach(filePath => {
      const pageName = filePath.match(/\/pages\/(.+)\/index.js/)[1]
      entry[pageName] = filePath
      // 实例化插件
      htmlPluginArray.push(
        new HtmlWebpackPlugin({
          filename: pages.length === 1 ? 'index.html' : pageName + '.html',
          template: projectConfig.srcPath + 'pages/' + pageName + '/' + pageName + '.html'
        })
      )
    })
  return entry
}

module.exports = {
  entry: getEntry(),
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
        test: /\.less/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'less-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: resolve('src')
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
    ...htmlPluginArray,
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css'
    })
  ]
}
