const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common.config');

const outputPath = path.join(__dirname, 'build', 'lib');
const filename = 'react-input-trigger';
const libraryName = 'ReactInputTrigger';
const production = JSON.stringify('production');

const externals = { react: 'react' };
const plugins = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': production }),
];

module.exports = merge(commonConfiguration, {
  devtool: 'source-map', // original source - for use in production,
  output: {
    path: outputPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals,
  plugins,
});
