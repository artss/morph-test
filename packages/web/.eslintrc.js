const { resolve } = require('path');

module.exports = {
  parserOptions: {
    project: resolve(__dirname, './tsconfig.json'),
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['web/src'],
      },
      alias: {
        map: [['@', resolve(__dirname, 'src')]],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
