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
const { registerPlugins } = require('../../src/plugins')
const OpenapiBackend = require('@mojaloop/central-services-shared').Util.OpenapiBackend
const Path = require('path')
const Handlers = require('../../src/handlers')

describe('plugins', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('registerPlugins', () => {
    it('registers the plugins', async () => {
      const serverMock = {
        register: jest.fn()
      }
      const api = await OpenapiBackend.initialise(Path.resolve(__dirname, '../../src/interface/openapi.yaml'), Handlers)
      await registerPlugins(serverMock, api)
      expect(serverMock.register.mock.calls.length).toBe(5)
    })
  })
})
