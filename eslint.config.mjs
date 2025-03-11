/* import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})
const eslintConfig = [
  ...compat.config(
    {
      extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
      settings: {
      next: {
        rootDir: 'web',
      },
    },
    },
    {
      // Note: there should be no other properties in this object
      ignores: ['./sanity.types.ts'],
    },
  ),
]
export default eslintConfig
 */

import pluginNext from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist', 'node_modules', '.sanity', '.next'],
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      'typescript-eslint': tseslint,
    },
    /*     languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        //project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    }, */
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-default-export': 'error',
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
    },
  },
  {
    files: ['studio/**/sanity.config.ts', 'studio/**/sanity.cli.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    ignores: ['dist', 'node_modules', '.next'],
    files: ['web/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      '@next/next': pluginNext,
    },
    settings: {
      next: {
        rootDir: 'web',
      },
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  eslintConfigPrettier,
]
