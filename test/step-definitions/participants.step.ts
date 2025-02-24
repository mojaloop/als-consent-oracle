/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
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
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>

 - Kevin Leyow <kevin.leyow@modusbox.com>
 --------------
 ******/

import path from 'path'
import { loadFeature, defineFeature } from 'jest-cucumber'
import { Server, ServerInjectResponse } from '@hapi/hapi'
import Config from '~/shared/config'
import * as Domain from '~/domain/participants'

import OracleServer from '../../src/server'
import { Consent } from '~/model/consent'
import Headers from '../data/headers.json'

import { jest, afterEach, expect } from '@jest/globals'

const mockRetrieveConsent = jest.spyOn(Domain, 'retrieveConsent')
const mockCreateConsent = jest.spyOn(Domain, 'createConsent')
const mockUpdateConsent = jest.spyOn(Domain, 'updateConsent')
const mockDeleteConsent = jest.spyOn(Domain, 'deleteConsent')
const retrievedConsent: Consent = {
  id: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
  fspId: 'dfspa'
}

const featurePath = path.join(__dirname, '../features/participants.scenario.feature')
const feature = loadFeature(featurePath)

defineFeature(feature, (test): void => {
  let server: Server
  let response: ServerInjectResponse

  afterEach((done): void => {
    server.events.on('stop', done)
    server.stop()
  })

  test('GET participants/{Type}/{ID} request', ({ given, when, then }): void => {
    given('als-consent-oracle server', async (): Promise<Server> => {
      server = await OracleServer.run(Config)
      return server
    })

    when('an ALS requests a valid GET /participants/{Type}/{ID} request', async (): Promise<ServerInjectResponse> => {
      mockRetrieveConsent.mockResolvedValueOnce(retrievedConsent)
      const request = {
        method: 'GET',
        url: '/participants/CONSENT/fb2f2b12-5107-48f1-a93d-52b154270038',
        headers: Headers
      }
      response = await server.inject(request)
      return response
    })

    then('I respond with a 200 OK', (): void => {
      expect(response.statusCode).toBe(200)
      expect(mockRetrieveConsent).toHaveBeenCalledWith('fb2f2b12-5107-48f1-a93d-52b154270038')
    })
  })

  test('POST participants/{Type}/{ID} request', ({ given, when, then }): void => {
    given('als-consent-oracle server', async (): Promise<Server> => {
      server = await OracleServer.run(Config)
      return server
    })

    when('an ALS requests a valid POST /participants/{Type}/{ID} request', async (): Promise<ServerInjectResponse> => {
      mockCreateConsent.mockResolvedValueOnce()
      const request = {
        method: 'POST',
        url: '/participants/CONSENT/fb2f2b12-5107-48f1-a93d-52b154270038',
        headers: Headers,
        payload: {
          currency: 'USD',
          fspId: 'dfspa'
        }
      }
      response = await server.inject(request)
      return response
    })

    then('I respond with a 201 Created', (): void => {
      expect(response.statusCode).toBe(201)
      expect(mockCreateConsent).toHaveBeenCalledWith({ fspId: 'dfspa', id: 'fb2f2b12-5107-48f1-a93d-52b154270038' })
    })
  })

  test('PUT participants/{Type}/{ID} request', ({ given, when, then }): void => {
    given('als-consent-oracle server', async (): Promise<Server> => {
      server = await OracleServer.run(Config)
      return server
    })

    when('an ALS requests a valid PUT /participants/{Type}/{ID} request', async (): Promise<ServerInjectResponse> => {
      mockUpdateConsent.mockResolvedValueOnce()
      const request = {
        method: 'PUT',
        url: '/participants/CONSENT/fb2f2b12-5107-48f1-a93d-52b154270038',
        headers: Headers,
        payload: {
          currency: 'USD',
          fspId: 'dfspa'
        }
      }
      response = await server.inject(request)
      return response
    })

    then('I respond with a 200 OK', (): void => {
      expect(response.statusCode).toBe(200)
      expect(mockUpdateConsent).toHaveBeenCalledWith({ fspId: 'dfspa', id: 'fb2f2b12-5107-48f1-a93d-52b154270038' })
    })
  })

  test('DELETE participants/{Type}/{ID} request', ({ given, when, then }): void => {
    given('als-consent-oracle server', async (): Promise<Server> => {
      server = await OracleServer.run(Config)
      return server
    })

    when(
      'an ALS requests a valid DELETE /participants/{Type}/{ID} request',
      async (): Promise<ServerInjectResponse> => {
        mockDeleteConsent.mockResolvedValueOnce()
        const request = {
          method: 'DELETE',
          headers: Headers,
          url: '/participants/CONSENT/fb2f2b12-5107-48f1-a93d-52b154270038'
        }
        response = await server.inject(request)
        return response
      }
    )

    then('I respond with a 204 No Content', (): void => {
      expect(response.statusCode).toBe(204)
      expect(mockDeleteConsent).toHaveBeenCalledWith('fb2f2b12-5107-48f1-a93d-52b154270038')
    })
  })
})
