const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common.config');

module.exports = merge(commonConfiguration, {
  context: path.resolve(__dirname, 'view'),
  devtool: 'cheap-eval-source-map', // transformed code (lines only),
  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/',
    filename: 'app.js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
