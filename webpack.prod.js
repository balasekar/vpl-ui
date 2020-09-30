const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const es7Rules = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader', 'eslint-loader']
};

const htmlRules = {
  test: /\.html$/,
  use: { loader: 'html-loader' }
};

const cssRules = {
  test: /\.css$/i,
  exclude: /\.min\.css$/i,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader' }
  ]
};

const lessRules = {
  test: /\.less$/i,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader' },
    { loader: 'less-loader' }
  ]
};

const fileRules = {
  test: /\.(png|jpg|gif|svg|ttf|woff2|woff|eot)$/,
  use: [{ loader: 'url-loader?name=[name].[ext]', options: { limit: 1000000 } }]
};

module.exports = {
  resolve: {
    alias: {
      '../../theme.config$': path.join(__dirname, 'style/theme.config'),
      '../semantic-ui/site': path.join(__dirname, 'style/site')
    }
  },
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      htmlRules,
      es7Rules,
      lessRules,
      cssRules,
      fileRules
    ]
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'style/site/assets/images/SPC.ico',
      template: 'src/app/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css'
    })
  ]
};
