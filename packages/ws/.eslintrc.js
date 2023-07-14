const { resolve } = require('path');

module.exports = {
  parserOptions: {
    project: resolve(__dirname, './tsconfig.json'),
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['ws/src'],
      },
      alias: {
        map: [['@', resolve(__dirname, 'src')]],
        extensions: ['.ts'],
      },
    },
  },
};
