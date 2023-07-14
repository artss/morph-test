const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { filename } = require('./utils');
const babelConfig = require('./babel.config');

module.exports = {
  entry: {
    main: './src/index.tsx',
  },

  output: {
    filename: filename('js'),
    sourceMapFilename: filename('js.map'),
    chunkFilename: '[id].[chunkhash].js',
    path: path.resolve('.', 'dist'),
    publicPath: '/',
    globalObject: 'self',
  },

  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.js', '.json', '.ts', '.tsx'],
    modules: [path.resolve('.', 'src'), 'node_modules'],
    alias: {
      '@': path.resolve('.', 'src'),
    },
    fallback: {
      assert: require.resolve('assert'),
      fs: false,
      module: false,
      os: false,
      path: require.resolve('path-browserify'),
      url: require.resolve('url'),
      process: require.resolve('process/browser'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, '..', '..', 'src'),
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: babelConfig,
      },

      {
        test: /\.(jpe?g|gif|png|ico|gltf|woff2?|eot|otf|ttf)$/,
        loader: 'file-loader',
        options: {
          name: `assets/${filename('[ext]')}`,
          limit: 10000,
        },
      },

      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },

      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),

    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      inject: true,
      hash: false,
      async: true,
    }),

    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
  ],
};
