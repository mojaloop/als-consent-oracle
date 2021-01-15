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
jest.mock('../../src/db')

describe('Index Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should start the server', () => {
    const mockCreateServer = jest.fn()
    jest.mock('../../src/server.js', () => ({ createServer: mockCreateServer }))
    require('../../src/index.js')
    expect(mockCreateServer.mock.calls.length).toBe(1)
  })
})
