import type { Config } from 'jest';

const config: Config = {
  moduleDirectories: ['../../../node_modules', '../../node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^platform-bible-react$': '<rootDir>/node_modules/platform-bible-react/dist/index.js',
    '^platform-bible-utils$': '<rootDir>/node_modules/platform-bible-utils/dist/index.js',
  },
  testPathIgnorePatterns: ['dist'],
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
};

export default config;
