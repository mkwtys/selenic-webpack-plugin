module.exports = {
  collectCoverageFrom: ['src/**/*.(ts|js)'],
  coveragePathIgnorePatterns: ['/node_modules/', 'fixtures'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [`src/**/__tests__/*.+(ts|js)`, `**/?(*.)+(spec|test).(ts|js)?(x)`]
}
