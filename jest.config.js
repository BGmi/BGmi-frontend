module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.ts' // No need to cover bootstrap file
  ]
}
