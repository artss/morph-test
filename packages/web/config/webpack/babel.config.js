const { isEnvProduction } = require('./utils');

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],

  // customize: require.resolve('babel-preset-react-app/webpack-overrides'),

  plugins: [
    // '@babel/plugin-transform-runtime',
    // ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['babel-plugin-styled-components', { displayName: !isEnvProduction }],
    // [
    //   require.resolve('babel-plugin-named-asset-import'),
    //   { loaderMap: { svg: { ReactComponent: '@svgr/webpack' } } },
    // ],
  ],

  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables caching results in ./node_modules/.cache/babel-loader/
  // directory for faster rebuilds.
  // cacheDirectory: true,
  // See #6846 for context on why cacheCompression is disabled
  // cacheCompression: false,
  // compact: isEnvProduction,
};
