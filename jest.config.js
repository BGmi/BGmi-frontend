module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue,ts}',
    '!src/main.ts', // No need to cover bootstrap file
  ],
};
