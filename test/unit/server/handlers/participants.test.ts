import { Request, ResponseToolkit } from '@hapi/hapi'
import Participants from '~/server/handlers/participants'
import { postParticipantsRequest, h } from '../../../data/data';

jest.mock('~/shared/logger')

describe('server/handlers/participants', (): void => {
  beforeAll((): void => {
    jest.useFakeTimers()
  })

  beforeEach((): void => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it('Should return Not Implemented',
    async (): Promise<void> => {
      const req = postParticipantsRequest as Request
      const response = await Participants.post(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h as ResponseToolkit
      )
      expect(response.statusCode).toBe(201)
  })
})
