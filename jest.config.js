/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "<rootDit>/src/migrations/*.ts"
  ]
};