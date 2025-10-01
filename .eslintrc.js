// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended', // jika menggunakan TypeScript
    'plugin:astro/recommended',
    'plugin:jsx-a11y/recommended', // untuk aksesibilitas
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Aturan khusus untuk proyek WIDI Furniture
    'no-console': 'warn', // Peringatkan penggunaan console.log
    'no-unused-vars': 'warn', // Peringatkan variabel yang tidak digunakan
    'jsx-a11y/anchor-is-valid': 'off', // Astro tidak selalu memerlukan href di anchor
    'astro/no-set-html-directive': 'warn', // Peringatkan penggunaan set:html
    'prefer-const': 'error', // Lebih suka const daripada let jika tidak diubah
    'no-var': 'error', // Larang penggunaan var
    'semi': ['error', 'always'], // Wajibkan semicolon
    'quotes': ['error', 'single'], // Wajibkan single quote
    'comma-dangle': ['error', 'only-multiline'] // Hanya dangle comma di multiline
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    },
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
      ...require('eslint-config-airbnb-base/rules/best-practices'),
      ...require('eslint-config-airbnb-base/rules/es6'),
      ...require('eslint-config-airbnb-base/rules/imports'),
      ...require('eslint-config-airbnb-base/rules/style'),
      ...require('eslint-config-airbnb-base/rules/variables'),
      ...require('eslint-config-airbnb-base/rules/node'),
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx', '.astro']
      }
    },
    'jsx-a11y': {
      components: {
        Link: 'a',
        NavLink: 'a',
      },
    },
  },
};