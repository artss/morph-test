const os = require('os');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: Math.ceil(os.cpus().length / 2),
      }),
    ],
  },

  plugins: baseConfig.plugins.concat([
    new CompressionPlugin({
      filename: '[name].gz[query]',
      test: /\.(js|css|html|jpe?g|gif|png|ico|gltf|svg|woff2?|eot|otf|ttf)$/,
      threshold: 10240,
      minRatio: 0.8,
      algorithm: 'gzip',
    }),
  ]),
});
