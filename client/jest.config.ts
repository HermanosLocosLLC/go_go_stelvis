import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src/test'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // moduleNameMapper: {
  //   '\\.(s?css)$': '<rootDir>/test/config/scssStub.js',
  // },
  // resolver: '',
}

export default config
