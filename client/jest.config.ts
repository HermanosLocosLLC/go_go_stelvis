import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>//src/test/setupFile.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  // moduleDirectories: ['node_modules', '<rootDir>/src/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(s?css)$': '<rootDir>/test/config/scssStub.js',
  },
  // resolver: '',
}

export default config
