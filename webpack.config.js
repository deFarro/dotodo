'use strict';

const path = require('path');

module.exports = {
  entry: ['./src/js/app.js'],

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
          loader: 'babel-loader',
          options: {"presets": ["react", "env"]}
      }]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
          options: {sourceMap: true}
        },
        {
          loader: 'css-loader',
          options: {sourceMap: true}
        },
        {
          loader: 'sass-loader',
          options: {sourceMap: true}
      }]
    }]
  },

  stats: {
    assets: false,
    version: false
  }
};
