module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@thetypefounders/unicode-classifier/.*)'],
  moduleNameMapper: {
    '^@platform-scripture/(.*)$': '$1',
  },
};
