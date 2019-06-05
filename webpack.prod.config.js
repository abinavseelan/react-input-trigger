const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfiguration = require('./webpack.common.config');
const productionConfiguration = {
  mode: 'production',
  devtool: 'source-map',
  externals: { react: 'react' },
  optimization: {
    minimizer: [
      new TerserPlugin()
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ],
}

const libraryConfiguration = merge(
  commonConfiguration,
  productionConfiguration,
  {
    output: {
      path: path.join(__dirname, 'build', 'lib'),
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
  }
);

const docsConfiguration = merge.strategy({ entry: 'replace' })(
  commonConfiguration,
  productionConfiguration,
  {
    entry: { app: path.resolve(__dirname, 'src', 'docs', 'index.js'), },
    context: path.resolve(__dirname, 'src', 'docs'),
    output: {
      path: path.resolve(__dirname, 'docs'),
      publicPath: './',
      filename: '[name].[chunkhash:5].js',
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
    ],
  }
);

// for debugging merged options:
// console.log(
//   require('util').inspect({
//     libraryConfiguration, docsConfiguration
//   }, true, 4, true)
// )

module.exports = [
  libraryConfiguration,
  docsConfiguration,
];
