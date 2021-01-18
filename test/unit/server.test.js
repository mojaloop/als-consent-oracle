/**************************************************************************
 *  (C) Copyright Mojaloop Foundation 2020 - All rights reserved.         *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  Original Author:                                                      *
 *       Lewis Daly - lewisd@crosslaketech.com                            *
 **************************************************************************/
'use strict'
const { OracleDatabase } = require('../../src/db')
const { createServer } = require('../../src/server')

const fakeConfig = {
  client: 'mysql2',
  connection: {
    host: 'iouwerioj',
    database: 'dfjdsak',
    user: '90knvbzl',
    port: 'fusiaodvj'
  },
  pool: {
    min: 10,
    max: 10,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200
  },
  debug: false
}
jest.mock('@mojaloop/central-services-logger', () => {
  return {
    info: jest.fn(), // suppress info output
    debug: jest.fn()
  }
})

jest.mock('@mojaloop/central-services-metrics', () => {
  return {
    setup: jest.fn()
  }
})

/* Mock out the Hapi Server */
const mockStart = jest.fn()
jest.mock('@hapi/hapi', () => ({
  Server: jest.fn().mockImplementation(() => ({
    register: jest.fn(),
    ext: jest.fn(),
    route: jest.fn(),
    start: mockStart,
    plugins: {
      openapi: {
        setHost: jest.fn()
      }
    },
    info: {
      host: 'localhost',
      port: 3000
    },
    app: {
    }
  }))
}))

describe('server', () => {
  describe('initialize', () => {
    it('initializes the server', async () => {
      const client = jest.fn()
      const clientConstructor = jest.fn().mockImplementation(() => {
        return client
      })
      const db = new OracleDatabase(fakeConfig, clientConstructor)
      await createServer(3000, db)

      expect(mockStart).toHaveBeenCalled()
    })
  })
})
