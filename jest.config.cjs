const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
