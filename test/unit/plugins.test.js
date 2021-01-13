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

const Sinon = require('sinon')

const { registerPlugins } = require('../../src/plugins')

let sandbox
describe('plugins', () => {
  beforeAll(() => {
    sandbox = Sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('registerPlugins', () => {
    it('registers the plugins', async () => {
      // Arrange
      const serverStub = {
        register: sandbox.stub()
      }

      // Act
      await registerPlugins(serverStub)

      // Assert
      expect(serverStub.register.callCount).toBe(5)
    })
  })
})
