module.exports = {
  reject: [
    // Upgrading sqlite past 5.0.2 seems to introduce sh: 1: node-pre-gyp: not found.
    // Investigation needed. Updated to 5.1.7 in the meantime with no issues.
    // 'sqlite3',
  ]
}
