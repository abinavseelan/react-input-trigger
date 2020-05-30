const path = require('path');
const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const filename = 'react-input-trigger';
const libraryName = 'ReactInputTrigger';

const externals = { react: 'react' };

const libraryConfiguration = merge(commonConfiguration, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build/lib"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  externals,
  optimization: {
    minimize: false,
  }
});
console.log("__dirname", __dirname)

const docsConfiguration = merge.strategy({ entry: "replace" })(
  commonConfiguration,
  {
    mode: "production",
    entry: "./src/docs/index.js",
    output: {
      path: path.resolve("./public"),
      publicPath: "./",
      filename: "[name].[chunkhash:5].js",
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/docs/index.html" }),
      new UglifyJsPlugin(),
    ],
  }
);

module.exports = docsConfiguration;
