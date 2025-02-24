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

 - Paweł Marzec <pawel.marzec@modusbox.com>
 - Kenneth Zeng <kkzeng@google.com>
 --------------
 ******/

import { Request, ResponseToolkit} from '@hapi/hapi'
import * as Handler from '~/server/handlers/participants'
import Boom from '@hapi/boom'
import { h, postParticipantsRequest } from 'test/data/data'
import { jest, describe, it, expect } from '@jest/globals'

jest.mock('~/shared/logger')

describe('server/handler/participants', (): void => {
  describe('POST Handler', (): void => {
    it('should return a not implemented error.', async (): Promise<void> => {
      const req = postParticipantsRequest as unknown as Request
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
      expect(response).toStrictEqual(Boom.notImplemented())
    })
  })
})
