"use strict";
const path = require('path');
const publicPath = path.resolve(__dirname, 'public')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: publicPath
  },
  devtool: 'source-map',
  devServer: {
    contentBase: publicPath,
    watchContentBase: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@presenter': path.resolve(__dirname, 'src/presenter')
    },
  }
};
