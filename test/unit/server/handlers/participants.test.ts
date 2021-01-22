import { Request } from '@hapi/hapi'
import * as Handler from '~/server/handlers/participants'
import Boom from '@hapi/boom'
import {
  h,
  postParticipantsRequest
} from 'test/data/data'

jest.mock('~/shared/logger')

describe('server/handler/participants', (): void => {
  describe('POST Handler', (): void => {
    it('should return a not implemented error.', async (): Promise<void> => {
      const req = postParticipantsRequest as Request
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
      expect(response).toStrictEqual(Boom.notImplemented())
    })
  })
})
