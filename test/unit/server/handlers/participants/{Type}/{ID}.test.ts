import { Request } from '@hapi/hapi'
import { Enum } from '@mojaloop/central-services-shared'
import * as Handler from '~/server/handlers/participants/{Type}/{ID}'
import * as Domain from '~/domain/participants'
import { Consent } from '~/model/consent';
import {
  deleteParticipantsByTypeAndIDRequest,
  putParticipantsByTypeAndIDRequest,
  postParticipantsByTypeAndIDRequest,
  deleteParticipantsByWrongTypeAndIDRequest,
  putParticipantsByWrongTypeAndIDRequest,
  postParticipantsByWrongTypeAndIDRequest
} from 'test/data/data'
import { IDTypeNotSupported } from '~/model/errors';
import {
  h,
  getParticipantsByTypeAndIDRequest
} from 'test/data/data'

jest.mock('~/shared/logger')

const mockRetrieveConsent = jest.spyOn(Domain, 'retrieveConsent')
const mockCreateConsent = jest.spyOn(Domain, 'createConsent')
const mockUpdateConsent = jest.spyOn(Domain, 'updateConsent')
const mockDeleteConsent = jest.spyOn(Domain, 'deleteConsent')

/* Mock the retrieved consent value. */
const retrievedConsent: Consent = {
  id: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
  fspId: 'dfspa'
}

describe('server/handler/participants/{Type}/{ID}', (): void => {
  beforeAll((): void => {
  })

  beforeEach((): void => {
    jest.clearAllMocks()
  })

  describe('GET Handler', (): void => {

    beforeAll((): void => {
      mockRetrieveConsent.mockResolvedValue(retrievedConsent)
    })

    it('should return a 200 success code.', async (): Promise<void> => {
      const req = getParticipantsByTypeAndIDRequest as Request
      const response = await Handler.get(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h)
      expect(response.statusCode).toBe(Enum.Http.ReturnCodes.OK.CODE)
    })

    it('should fail if {Type} is not CONSENT', async (): Promise<void> => {
      let req = deleteParticipantsByWrongTypeAndIDRequest as Request
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
        h)
      expect(response).toStrictEqual(new IDTypeNotSupported())
    })
  })

  describe('POST Handler', (): void => {
    beforeAll((): void => {
      mockCreateConsent.mockResolvedValue()
    })

    it('should return a 201 success code.', async (): Promise<void> => {
      const req = postParticipantsByTypeAndIDRequest as Request
      const response = await Handler.post(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h)
      expect(response.statusCode).toBe(Enum.Http.ReturnCodes.CREATED.CODE)
    })

    it('should fail if {Type} is not CONSENT', async (): Promise<void> => {
      let req = postParticipantsByWrongTypeAndIDRequest as Request
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
        h)
      expect(response).toStrictEqual(new IDTypeNotSupported())
    })
  })

  describe('PUT Handler', (): void => {
    beforeAll((): void => {
      mockUpdateConsent.mockResolvedValue()
    })

    it('should return a 200 success code.', async (): Promise<void> => {
      const req = putParticipantsByTypeAndIDRequest as Request
      const response = await Handler.put(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h)
      expect(response.statusCode).toBe(Enum.Http.ReturnCodes.OK.CODE)
    })

    it('should fail if {Type} is not CONSENT', async (): Promise<void> => {
      let req = putParticipantsByWrongTypeAndIDRequest as Request
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
        h)
      expect(response).toStrictEqual(new IDTypeNotSupported())
    })
  })

  describe('DELETE Handler', (): void => {
    beforeAll((): void => {
      mockDeleteConsent.mockResolvedValue()
    })

    it('should return a 204 no content code.', async (): Promise<void> => {
      const req = deleteParticipantsByTypeAndIDRequest as Request
      const response = await Handler.del(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h)
      expect(response.statusCode).toBe(Enum.Http.ReturnCodes.NOCONTENT.CODE)
    })

    it('should fail if {Type} is not CONSENT', async (): Promise<void> => {
      const req = deleteParticipantsByWrongTypeAndIDRequest as Request

      const response = await Handler.del(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h)
      expect(response).toStrictEqual(new IDTypeNotSupported())
    })
  })
})
