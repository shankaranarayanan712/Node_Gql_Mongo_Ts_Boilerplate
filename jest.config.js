module.exports = {
  roots: ['<rootDir>'],
  transform: {
    "^.+\\.graphql$": "jest-transform-graphql",
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node', 'graphql'],
  collectCoverage: false,
  clearMocks: true,
  coverageDirectory: "coverage",
};
