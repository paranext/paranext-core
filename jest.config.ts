import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import fs from 'fs';
import typescript from 'typescript';

// Get this tsconfig
const {
  config: { compilerOptions },
} = typescript.parseConfigFileTextToJson('tsconfig.json', fs.readFileSync('tsconfig.json', 'utf8'));

const config: Config = {
  moduleDirectories: ['node_modules', 'release/app/node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.erb/mocks/file.mock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/src',
    }),
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testPathIgnorePatterns: ['release/app/dist', '.erb/dll', 'extensions/dist'],
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
};

export default config;
