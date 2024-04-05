/* eslint-disable indent */

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
    },
    languageOptions: {
      parserOptions: {
        'ecmaVersion': 2022,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // ... any rules you want
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
    // ... others are omitted for brevity
  }
];