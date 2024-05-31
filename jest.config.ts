import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv:
    process.env.NODE_ENV === 'test-local'
      ? ['<rootDir>/server/test/setup-local.ts']
      : ['<rootDir>/server/test/setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
};

export default config;
