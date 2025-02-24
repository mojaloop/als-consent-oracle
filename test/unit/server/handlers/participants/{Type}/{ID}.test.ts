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

 --------------
 ******/

import { Request, ResponseToolkit } from '@hapi/hapi'
import { Enum } from '@mojaloop/central-services-shared'
import * as Handler from '~/server/handlers/participants/{Type}/{ID}'
import * as Domain from '~/domain/participants'
import {
  deleteParticipantsByTypeAndIDRequest,
  putParticipantsByTypeAndIDRequest,
  postParticipantsByTypeAndIDRequest,
  deleteParticipantsByWrongTypeAndIDRequest,
  putParticipantsByWrongTypeAndIDRequest,
  postParticipantsByWrongTypeAndIDRequest,
  h,
  getParticipantsByTypeAndIDRequest,
  mockConsent
} from 'test/data/data'
import { IDTypeNotSupported } from '~/model/errors'
import { jest, describe, it, expect, beforeAll } from '@jest/globals'

jest.mock('~/shared/logger')

const mockRetrieveConsent = jest.spyOn(Domain, 'retrieveConsent')
const mockCreateConsent = jest.spyOn(Domain, 'createConsent')
const mockUpdateConsent = jest.spyOn(Domain, 'updateConsent')
const mockDeleteConsent = jest.spyOn(Domain, 'deleteConsent')

describe('server/handler/participants/{Type}/{ID}', (): void => {
  describe('GET Handler', (): void => {
    beforeAll((): void => {
      mockRetrieveConsent.mockResolvedValue(mockConsent)
    })

    it('should return a 200 success code.', async (): Promise<void> => {
      const req = getParticipantsByTypeAndIDRequest as unknown as Request
      const response = await Handler.get(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as unknown as ResponseToolkit
      )
      expect(response.statusCode).toBe(Enum.Http.ReturnCodes.OK.CODE)
    })

    it('should fail if {Type} is not CONSENT', async (): Promise<void> => {
      const req = deleteParticipantsByWrongTypeAndIDRequest as unknown as Request
      req.params.Type = 'ACCOUNT_ID'

      const response = await Handler.get(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as unknown as ResponseToolkit
      )
      expect(response).toStrictEqual(new IDTypeNotSupported())
    })
  })

  describe('POST Handler', (): void => {
    beforeAll((): void => {
      mockCreateConsent.mockResolvedValue()
    })

    it('should return a 201 success code.', async (): Promise<void> => {
      const req = postParticipantsByTypeAndIDRequest as unknown as Request
      const response = await Handler.post(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as unknown as ResponseToolkit
      )
      expect(response.statusCode).toBe(Enum.Http.ReturnCodes.CREATED.CODE)
    })

    it('should fail if {Type} is not CONSENT', async (): Promise<void> => {
      const req = postParticipantsByWrongTypeAndIDRequest as unknown as Request
      req.params.Type = 'ACCOUNT_ID'

      const response = await Handler.post(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as unknown as ResponseToolkit
      )
      expect(response).toStrictEqual(new IDTypeNotSupported())
    })
  })

  describe('PUT Handler', (): void => {
    beforeAll((): void => {
      mockUpdateConsent.mockResolvedValue()
    })

    it('should return a 200 success code.', async (): Promise<void> => {
      const req = putParticipantsByTypeAndIDRequest as unknown as Request
      const response = await Handler.put(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as unknown as ResponseToolkit
      )
      expect(response.statusCode).toBe(Enum.Http.ReturnCodes.OK.CODE)
    })

    it('should fail if {Type} is not CONSENT', async (): Promise<void> => {
      const req = putParticipantsByWrongTypeAndIDRequest as unknown as Request
      req.params.Type = 'ACCOUNT_ID'

      const response = await Handler.put(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as unknown as ResponseToolkit
      )
      expect(response).toStrictEqual(new IDTypeNotSupported())
    })
  })

  describe('DELETE Handler', (): void => {
    beforeAll((): void => {
      mockDeleteConsent.mockResolvedValue()
    })

    it('should return a 204 no content code.', async (): Promise<void> => {
      const req = deleteParticipantsByTypeAndIDRequest as unknown as Request
      const response = await Handler.del(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as unknown as ResponseToolkit
      )
      expect(response.statusCode).toBe(Enum.Http.ReturnCodes.NOCONTENT.CODE)
    })

    it('should fail if {Type} is not CONSENT', async (): Promise<void> => {
      const req = deleteParticipantsByWrongTypeAndIDRequest as unknown as Request

      const response = await Handler.del(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as unknown as ResponseToolkit
      )
      expect(response).toStrictEqual(new IDTypeNotSupported())
    })
  })
})
