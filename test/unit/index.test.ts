/*****
 License
 --------------
 Copyright © 2020 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Lewis Daly <lewis@vesselstech.com>
 * Paweł Marzec <pawel.marzec@modusbox.com>
 --------------
 ******/

import index from '~/index'
import Config from '~/shared/config'
import { Server } from '@hapi/hapi'
// import { Context } from '~/server/plugins'

// Import handlers for mocking
// import Handlers from '~/server/handlers'

// Mock data
// import Headers from '../data/headers.json'

jest.mock('~/shared/logger')

describe('index', (): void => {
  it('should have proper layout', (): void => {
    expect(typeof index.server).toBeDefined()
    expect(typeof index.server.run).toEqual('function')
  })
})

describe('api routes', (): void => {
  let server: Server

  beforeAll(async (): Promise<void> => {
    server = await index.server.run(Config)
  })

  afterAll(async (done): Promise<void> => {
    server.events.on('stop', done)
    await server.stop()
    jest.clearAllMocks()
  })

  beforeEach((): void => {
    jest.clearAllMocks()
  })

  it('/health', async (): Promise<void> => {
    interface HealthResponse {
      status: string;
      uptime: number;
      startTime: string;
      versionNumber: string;
    }

    const request = {
      method: 'GET',
      url: '/health'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.result).toBeDefined()

    const result = response.result as HealthResponse
    expect(result.status).toEqual('OK')
    expect(result.uptime).toBeGreaterThan(1.0)
  })

  it('/metrics', async (): Promise<void> => {
    const request = {
      method: 'GET',
      url: '/metrics'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.result).toBeDefined()
  })
})
