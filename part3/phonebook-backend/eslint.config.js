import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import { defineConfig } from 'eslint-define-config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node
      },
    },
    plugins: {
      js,
      '@stylistic': stylistic,
    },
    rules: {
      ...js.configs.recommended.rules,
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
    },
  },
])
