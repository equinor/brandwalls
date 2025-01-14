export default [
  'eslint:recommended',
  'plugin:@typescript-eslint/strict-type-checked',
  'plugin:@typescript-eslint/stylistic-type-checked',
  'next/core-web-vitals',
  'prettier',
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    },
  },
]
