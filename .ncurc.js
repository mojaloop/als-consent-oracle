module.exports = {
  reject: [
    // Upgrading past husky@4 to involves a full config migration with no current and apparent benefit.
    // So we are just sticking to husky@4.x.x for the time being.
    'husky',
    // Upgrading past jest|ts-jest|@types/jest@26 introduces a lot of breaking changes to current tests.
    'jest',
    'ts-jest',
    '@types/jest',
    // Upgrading past commander@7 introduces a lot of breaking changes.
    'commander',
    // Upgrading sqlite past 5.0.2 seems to introduce sh: 1: node-pre-gyp: not found.
    // Investigation needed.
    'sqlite3',
  ]
}
