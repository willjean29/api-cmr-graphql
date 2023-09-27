/** @type {import('jest').Config} */

const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/test';

const config = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    `${baseDir}/**/*.js`,
    `!${baseDir}/db/resolvers.js`,
    `!${baseDir}/db/schema.js`,
    `!${baseDir}/index.js`
  ],
  testMatch: [
    `${baseTestDir}/**/*{spec,test}.js`,
  ]
}

module.exports = config;