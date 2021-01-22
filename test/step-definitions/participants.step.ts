import path from 'path'
import { loadFeature, defineFeature } from 'jest-cucumber'
import { Server, ServerInjectResponse } from '@hapi/hapi'
import Config from '~/shared/config'
import * as Domain from '~/domain/participants'

import OracleServer from '../../src/server'
import { Consent } from '~/model/consent';
import Headers from '../data/headers.json'

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
      expect(mockRetrieveConsent).toBeCalledWith('fb2f2b12-5107-48f1-a93d-52b154270038')
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
          "currency": "USD",
          "fspId": "dfspa"
        }
      }
      response = await server.inject(request)
      return response
    })

    then('I respond with a 201 Created', (): void => {
      expect(response.statusCode).toBe(201)
      expect(mockCreateConsent).toBeCalledWith(
        {"fspId": "dfspa", "id": "fb2f2b12-5107-48f1-a93d-52b154270038"}
      )
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
          "currency": "USD",
          "fspId": "dfspa"
        }
      }
      response = await server.inject(request)
      return response
    })

    then('I respond with a 200 OK', (): void => {
      expect(response.statusCode).toBe(200)
      expect(mockUpdateConsent).toBeCalledWith(
        {"fspId": "dfspa", "id": "fb2f2b12-5107-48f1-a93d-52b154270038"}
      )
    })
  })

  test('DELETE participants/{Type}/{ID} request', ({ given, when, then }): void => {
    given('als-consent-oracle server', async (): Promise<Server> => {
      server = await OracleServer.run(Config)
      return server
    })

    when('an ALS requests a valid DELETE /participants/{Type}/{ID} request', async (): Promise<ServerInjectResponse> => {
      mockDeleteConsent.mockResolvedValueOnce()
      const request = {
        method: 'DELETE',
        headers: Headers,
        url: '/participants/CONSENT/fb2f2b12-5107-48f1-a93d-52b154270038'
      }
      response = await server.inject(request)
      return response
    })

    then('I respond with a 204 No Content', (): void => {
      expect(response.statusCode).toBe(204)
      expect(mockDeleteConsent).toBeCalledWith('fb2f2b12-5107-48f1-a93d-52b154270038')
    })
  })
})
