const process = require('process');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    // inline: true,
    hot: true,
    static: {
      publicPath: '/files',
      directory: path.resolve(__dirname, '..', '..', '..', '..', 'files'),
    },
    port: 8000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    proxy: {
      '/socket.io/': {
        target: process.env.WS_URL || 'http://localhost:8001/',
        // changeOrigin: true,
        ws: true,
      },
    },
  },
  watchOptions: {
    poll: 1000,
  },
});
