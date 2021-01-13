/**************************************************************************
 *  (C) Copyright Mojaloop Foundation 2020 - All rights reserved.         *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  Original Author:                                                      *
 *       Rajiv Mothilal - rajiv.mothilal@modusbox.com                     *
 *  Contributors:                                                         *
 *       Lewis Daly - lewisd@crosslaketech.com                            *
 **************************************************************************/
/*
  For testing the server imports, we need to use jest.resetModules() between tests
  This means specifying future imports here and actually doing the importing in `beforeEach`
*/
let Sinon
let Command
let sandbox

describe('base Tests', () => {
  beforeEach(() => {
    jest.resetModules()

    Sinon = require('sinon')
    Command = require('commander').Command

    sandbox = Sinon.createSandbox()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should display help if called with no args', () => {
    // Arrange
    const sandbox = Sinon.createSandbox()
    const mockInitStub = sandbox.stub()
    const helpStub = sandbox.stub(Command.prototype, 'help').returns(true)

    jest.mock('../../src/server.js', () => ({ initialize: mockInitStub }))
    jest.mock('../../src/lib/argv.js', () => ({
      getArgs: () => []
    }))

    // Act
    require('../../src/index')
    // Assert
    // When starting with help, the help() method gets called
    expect(helpStub.callCount).toBe(1)
  })

  it('should start the server with the default config', () => {
    // Arrange
    const mockInitStub = sandbox.stub()
    const mockArgs = [
      'node',
      'src/index.js',
      'api'
    ]
    jest.mock('../../src/server.js', () => ({ initialize: mockInitStub }))
    jest.mock('../../src/lib/argv.js', () => ({
      getArgs: () => mockArgs
    }))

    // Act
    require('../../src/index.js')

    // Assert
    expect(mockInitStub.callCount).toBe(1)
  })
})
