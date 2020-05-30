const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const filename = 'react-input-trigger';
const libraryName = 'ReactInputTrigger';

const externals = { react: 'react' };

const libraryConfiguration = merge(commonConfiguration, {
  mode: 'production',
  output: {
    path: 'build/lib',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals,
});

const docsConfiguration = merge.strategy({ entry: 'replace' })(commonConfiguration, {
  mode: 'production',
  entry: './src/docs/index.js'
  output: {
    path: './public',
    publicPath: './',
    filename: '[name].[chunkhash:5].js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    uglifyPlugin,
  ],
});

module.exports = [
  libraryConfiguration,
  docsConfiguration,
];
