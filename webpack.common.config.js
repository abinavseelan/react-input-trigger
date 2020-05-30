const path = require('path');

module.exports = {
  entry: {
    'react-input-trigger': path.resolve(__dirname, 'src/index.ts'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.d.ts'],
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
