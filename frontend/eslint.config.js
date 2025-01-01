import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginImport from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig, // Disables ESLint rules that might conflict with Prettier
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin, // Add Prettier as a plugin
      import: eslintPluginImport, // Add the import plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'warn', // Enforce Prettier formatting as ESLint rules'
      'import/order': [
        'error',
        {
          groups: [
            'builtin',    // Built-in modules (e.g., 'fs' in Node.js)
            'external',   // External libraries (e.g., 'react', 'react-aria-components')
            'internal',   // Aliased imports (e.g., '#components', '#helpers')
            'parent',     // Parent imports (e.g., '../constants')
            'sibling',    // Sibling imports (e.g., './someFile')
            'index',      // Index imports (e.g., './')
          ],
          pathGroups: [
            {
              pattern: '#components/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '#helpers/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '#hooks/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '#pages/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '#services/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '#types/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          'newlines-between': 'always', // Adds a newline between groups
        },
      ],
    },
  }
)
