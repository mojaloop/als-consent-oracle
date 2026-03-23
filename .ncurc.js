module.exports = {
  reject: [
    // sqlite3 v6.x is a major version - keep on 5.x until verified
    'sqlite3',
    // eslint v10.x breaks eslint-plugin-import compatibility
    'eslint',
  ]
}
