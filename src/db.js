'use strict'

const Knex = require('knex')

class Database {
  // Config should contain:
  // { host, user, password, database {, port } }
  constructor (config, clientConstructor = Knex) {
    this.client = clientConstructor({
      ...config
    })
  }

  /**
     * Check whether the database connection has basic functionality
     *
     * @returns {boolean}
     */
  async isConnected () {
    try {
      const result = await this.client.raw('SELECT 1 + 1 AS result')
      return !!(result)
    } catch (err) {
      return false
    }
  }
}

/* class OracleDbError extends Error {
  constructor (code, message) {
    super(message)
    this.code = code
  }
}
*/
const ErrorCodes = Object.freeze({
  PARTICIPANT_NOT_FOUND: 'PARTICIPANT_NOT_FOUND'
})
/*
const Errors = {
  participantNotFound: (fspId) => new OracleDbError(ErrorCodes.PARTICIPANT_NOT_FOUND, `${fspId} not found`)
}
*/
class OracleDatabase extends Database {
  constructor (config, clientConstructor = Knex) {
    super(config, clientConstructor)

    /**
     * Error types for this class. Note that we do not use symbols, or "instanceof" because if
     * different versions of this code are used in different places, for example by transitive
     * dependency, the symbols or instance types will not be the same.
     */
    this.ErrorCodes = ErrorCodes
  }

  /**
   * Verifies an error type
   *
   * Note that we do not use symbols, or "instanceof" because if different versions of this code
   * are used in different places, for example by transitive dependency, the symbols or instance
   * types will not be the same.
   *
   * @returns boolean - error is of the type supplied
   */
  verifyErrorType (err, code) {
    return code in this.ErrorCodes && err.code === code
  }
}

module.exports = {
  OracleDatabase
}
