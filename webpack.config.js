'use strict';

const path = require('path');
const name = 'hunter.io';

const serverConf = {
  entry: './lib/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${name}.node.js`,
    library: 'EmailHunter',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  }
};

const clientConf = {
  entry: './lib/index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${name}.web.js`,
    library: 'EmailHunter',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  }
};

module.exports = [serverConf, clientConf];
