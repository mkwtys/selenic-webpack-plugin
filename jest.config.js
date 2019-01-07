module.exports = {
  collectCoverageFrom: ['src/**/*.(ts|js)'],
  coveragePathIgnorePatterns: ['/node_modules/', 'fixtures'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [`src/**/__tests__/*.+(ts|js)`, `**/?(*.)+(spec|test).(ts|js)?(x)`]
}
