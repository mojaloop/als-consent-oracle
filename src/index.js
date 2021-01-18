'use strict'

const util = require('util')
const Logger = require('@mojaloop/central-services-logger')
const Config = require('./config')
const { createServer } = require('./server')
const { OracleDatabase } = require('./db')

const initialize = async () => {
  // Set log level to info
  // eslint-disable-next-line
  Logger.transports.forEach(t => t.level = Config.LOG_LEVEL)

  const oracleDb = new OracleDatabase(Config.DATABASE)
  const server = await createServer(Config.SERVER_PORT, oracleDb)

  if (server) {
    try {
      // Perform initial health check
      const healthy = await server.app.healthCheck()
      if (healthy) {
        server.log('info', 'Database connected')
      } else {
        throw new Error(healthy.message)
      }

      server.log('info', `Server running on ${server.info.host}:${server.info.port}`)
      return server
    } catch (e) {
      server.log('error', util.format(e))
      throw e
    }
  }
}

try {
  initialize()
} catch (e) {
  Logger.error(e)
}
