const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common.config');

module.exports = merge.strategy({ entry: 'replace' })(commonConfiguration, {
  entry: { app: path.resolve(__dirname, 'src', 'docs', 'index.js'), },
  context: path.resolve(__dirname, 'src', 'docs'),
  devtool: 'cheap-eval-source-map', // transformed code (lines only),
  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new webpack.NamedModulesPlugin(), // for HMR
    new webpack.HotModuleReplacementPlugin(),
  ],
});
