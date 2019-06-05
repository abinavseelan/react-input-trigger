const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const outputPath = path.join(__dirname, 'build', 'lib');
const filename = 'react-input-trigger';
const libraryName = 'ReactInputTrigger';
const production = JSON.stringify('production');
const devtool = 'source-map'; // original source - for use in production

const externals = { react: 'react' };
const definePlugin = new webpack.DefinePlugin({ 'process.env.NODE_ENV': production });
const uglifyPlugin = new UglifyJsPlugin();

const libraryConfiguration = merge(commonConfiguration, {
  devtool,
  output: {
    path: outputPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals,
  plugins: [uglifyPlugin, definePlugin],
});

const docsConfiguration = merge.strategy({ entry: 'replace' })(commonConfiguration, {
  entry: { app: path.resolve(__dirname, 'src', 'docs', 'index.js'), },
  mode: 'production',
  context: path.resolve(__dirname, 'src', 'docs'),
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: './',
    filename: '[name].[chunkhash:5].js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    definePlugin,
    uglifyPlugin,
  ],
  devtool,
});

module.exports = [
  libraryConfiguration,
  docsConfiguration,
];
