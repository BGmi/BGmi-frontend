module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.d.ts', '.ts'],
    },
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
      alias: {
        map: [
          ['@/', './src/'],
        ],
        extensions: ['.ts', '.vue', '.js', '.d.ts'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    '@vue/standard',
    '@vue/typescript',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    semi: ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'template-curly-spacing': 'off',
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups:
          [
            'builtin',
            'external',
            ['index', 'sibling', 'parent'],
            'internal',
            'object',
          ],
      },
    ],
  },
  overrides: [
    {
      files: ['vue.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    }],
};
