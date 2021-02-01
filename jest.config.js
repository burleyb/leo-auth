module.exports = {
  roots: ['<rootDir>/test'],
  setupFiles: [
    "<rootDir>/setEnvVars.ts"
  ],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
