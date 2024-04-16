/* eslint-disable indent */
const reactPlugin = require( 'eslint-plugin-react');
const hooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        'ecmaVersion': 2022,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect', // You can add this if you get a warning about the React version when you lint
      },
    },    
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
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
     },
  },
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
];
