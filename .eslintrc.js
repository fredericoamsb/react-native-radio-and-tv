module.exports = {
  root: true,
  extends: 'airbnb-typescript',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/prop-types': 0,
    'object-curly-newline': 0,
    '@typescript-eslint/no-use-before-define': 0,
  }
};
