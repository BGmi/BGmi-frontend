module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    '@vue/standard',
    '@vue/typescript',
    'plugin:vue/essential',
    'plugin:vue/recommended',
  ],
  rules: {
    semi: ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'template-curly-spacing': 'off',
    'space-before-function-paren': ['error', 'never']
  },
  overrides: [{
    files: ['*.vue'],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser'
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    }
  }],
};
