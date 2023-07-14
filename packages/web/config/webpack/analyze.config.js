const { merge } = require('webpack-merge');
const prodConfig = require('./prod.config.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(prodConfig, {
  plugins: [new BundleAnalyzerPlugin({ openAnalyzer: false })],
});
