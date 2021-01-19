import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'
import ParticipantsTypeId from '~/server/handlers/participants/{Type}/{ID}'
import {
  getParticipantsTypeIDRequest,
  postParticipantsTypeIDRequest,
  putParticipantsTypeIDRequest,
  deleteParticipantsTypeIDRequest,
  h
} from '../../../../../data/data';

jest.mock('~/shared/logger')

describe('server/handlers/participants/{Type}/{ID}', (): void => {
  beforeAll((): void => {
    jest.useFakeTimers()
  })

  beforeEach((): void => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it('/GET should return Not Implemented',
    async (): Promise<void> => {
      const req = getParticipantsTypeIDRequest as Request
      const response = await ParticipantsTypeId.get(
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
      expect(response.message).toBe(Boom.notImplemented().message)
  })


  it('POST should return Not Implemented',
    async (): Promise<void> => {
      const req = postParticipantsTypeIDRequest as Request
      const response = await ParticipantsTypeId.post(
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
      expect(response.message).toBe(Boom.notImplemented().message)
  })


  it('PUT should return Not Implemented',
    async (): Promise<void> => {
      const req = putParticipantsTypeIDRequest as Request
      const response = await ParticipantsTypeId.put(
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
      expect(response.message).toBe(Boom.notImplemented().message)
  })


  it('DELETE should return Not Implemented',
    async (): Promise<void> => {
      const req = deleteParticipantsTypeIDRequest as Request
      const response = await ParticipantsTypeId.del(
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
      expect(response.message).toBe(Boom.notImplemented().message)
  })
})
