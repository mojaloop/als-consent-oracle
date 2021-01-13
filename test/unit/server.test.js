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
    }
  }))
}))

const { initialize } = require('../../src/server')

describe('server', () => {
  afterEach(() => {
    mockStart.mockClear()
  })

  describe('initialize', () => {
    it('initializes the server', async () => {
      // Arrange
      // Act
      await initialize(3000)

      // Assert
      expect(mockStart).toHaveBeenCalled()
    })

    it('initializes the server when no port is set', async () => {
      // Arrange
      // Act
      await initialize()

      // Assert
      expect(mockStart).toHaveBeenCalled()
    })
  })
})
