module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    'public/**/*',
    '*.json',
    '*.md',
    '*.csv',
    '*.test.tsx',
    'build/**/*',
    'src/utils/resources/*'
  ],
  rules: {
    '@typescript-eslint/indent': 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'no-case-declarations': 'warn'
  }
};
