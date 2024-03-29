module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'allowImportExportEverywhere': true
  },
  'plugins': ['react'],
  'rules': {
    'react/prop-types': 0,
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-unused-vars': 'off',
    'no-unreachable': 'off'
  }
};
