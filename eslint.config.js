import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  { ignores: ['dist'] },
  // Base recommended sets
  js.configs.recommended,
  tseslint.configs.recommended,
  // App rules (JS/TS)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true },],
      quotes: 'off',
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }]
    }
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // includes require, process, __dirname, module, etc.
      },
    },
    rules: {
      // allow require() in CJS scripts
      "@typescript-eslint/no-require-imports": "off",
    }
  }
)
