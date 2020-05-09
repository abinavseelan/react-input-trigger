const tsconfig = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: {
        ...tsconfig.compilerOptions,
        jsx: 'react',
      }
    }
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  }
};
