module.exports = {
  root: true,
  ignorePatterns: ['dist/**'],
  overrides: [
    {
      rules: {
        '@fluffyfox/jsx/no-template-literal': 'off',
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
      },
      files: ['**/*.d.ts', '**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      extends: ['kaho/react', 'kaho/ts', 'prettier'],
    },
  ],
};
