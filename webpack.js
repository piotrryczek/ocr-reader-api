const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: ['@babel/polyfill', `${__dirname}/src/server.js`],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
    }),
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
