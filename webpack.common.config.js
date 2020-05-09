const path = require('path');

module.exports = {
  entry: {
    'react-input-trigger': path.resolve(__dirname, 'src/index.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.d.ts'],
    alias: {
      '@src': path.resolve('./src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
