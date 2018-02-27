const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, 'view'),

  devtool: 'eval-source-map',

  entry: {
    app: './index.js',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'app.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
