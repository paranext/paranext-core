import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import fs from 'fs';
import typescript from 'typescript';
import packageInfo from './package.json';

// Get this tsconfig
const {
  config: { compilerOptions },
} = typescript.parseConfigFileTextToJson('tsconfig.json', fs.readFileSync('tsconfig.json', 'utf8'));

const config: Config = {
  moduleDirectories: ['node_modules', 'release/app/node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/extensions/dist', '<rootDir>/release'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.erb/mocks/file.mock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/src',
    }),
    '^platform-bible-react$': '<rootDir>/node_modules/platform-bible-react/dist/index.js',
    '^platform-bible-utils$': '<rootDir>/node_modules/platform-bible-utils/dist/index.js',
    '^jsonpath-plus$': '<rootDir>/node_modules/jsonpath-plus/dist/index-browser-umd.cjs',
  },
  setupFiles: ['./.erb/scripts/check-build-exists.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testPathIgnorePatterns: [
    'release/app/dist',
    '.erb/dll',
    /* We are running the tests of all workspaces separately */
    ...packageInfo.workspaces.map((w) => `<rootDir>/${w}`),
  ],
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
};

export default config;
