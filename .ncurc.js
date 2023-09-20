module.exports = {
  reject: [
    // Upgrading sqlite past 5.0.2 seems to introduce sh: 1: node-pre-gyp: not found.
    // Investigation needed.
    'sqlite3',
  ]
}
