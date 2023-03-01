module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  overrides: [
    {
      files: ['**/*.{ts,tsx,js,jsx}']
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint'],
  ignorePatterns: [
    'server/dist/**/*',
  ],
  rules: {
    '@typescript-eslint/indent': 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'no-case-declarations': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
