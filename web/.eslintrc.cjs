module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: [],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^React$',
      },
    ],
    // This rule was so noicy so let's turn it off and see how that works
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
  },
}
