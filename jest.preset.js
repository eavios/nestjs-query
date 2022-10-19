const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,

  collectCoverage: true,
  coverageReporters: ['html', 'clover'],
  collectCoverageFrom: [
    'packages/**/*.ts',
    '!**/__tests__/**',
    '!*.spec.ts',
    '!**/dist/**',
    '!**/node_modules/**',
    '!**/jest.config.ts',
  ],
  moduleNameMapper: {
    '@eavios/nestjs-query-core': process.cwd() + '/packages/core/src',
    '@eavios/nestjs-query-graphql': process.cwd() + '/packages/query-graphql/src',
    '@eavios/nestjs-query-typeorm': process.cwd() + '/packages/query-typeorm/src',
    '@eavios/nestjs-query-sequelize': process.cwd() + '/packages/query-sequelize/src',
    '@eavios/nestjs-query-typegoose': process.cwd() + '/packages/query-typegoose/src',
    '@eavios/nestjs-query-mongoose': process.cwd() + '/packages/query-mongoose/src',
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  snapshotSerializers: ['jest-snapshot-serializer-raw/always']
};
