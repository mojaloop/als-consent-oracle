/*****
 License
 --------------
 Copyright © 2020 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the 'License') and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
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
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 - Ahan Gupta <ahangupta.96@gmail.com>

 --------------
 ******/

import Config from '../../../config/knexfile'
import Knex from 'knex'

describe('testing Consent table', (): void => {
  let db: Knex<unknown[]>

  beforeAll(async (): Promise<void> => {
    db = Knex(Config.test)
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async (): Promise<void> => {
    db.destroy()
  })

  it('should properly select all the entries in the Consent table', async (): Promise<void> => {
    expect(db).toBeDefined()
    const consents: Knex.QueryBuilder[] = await db.from('Consent').select('*')
    expect(consents.length).toEqual(3)
    expect(consents[0]).toMatchObject({
      id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
      fspId: 'dfspa'
    })
    expect(consents[1]).toMatchObject({
      id: 'd4bfbde1-93d2-45f2-8372-968532dcfa34',
      fspId: 'dfspb'
    })
    expect(consents[2]).toMatchObject({
      id: '04be9a5c-44a2-4a8f-a497-59a7baca849a',
      fspId: 'dfspc'
    })
  })
})

describe('testing that constraints are enforced in the consent table', (): void => {
  let db: Knex<unknown[]>

  beforeAll(async (): Promise<void> => {
    db = Knex(Config.test)
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async (): Promise<void> => {
    db.destroy()
  })

  it('should properly enforce the primary key constraint in the Consent table', async (): Promise<void> => {
    expect(db).toBeDefined()
    /* Tests for duplication */
    await expect(db.from('Consent').insert({
      id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
      fspId: 'dfspa'
    })).rejects.toThrow()
    /* Tests for non-nullity */
    await expect(db.from('Consent').insert({
      id: null,
      fspId: 'dfspa'
    })).rejects.toThrow()
  })
  it('should properly enforce the non-nullable constraint for fspId', async (): Promise<void> => {
    expect(db).toBeDefined()
    await expect(db.from('Consent').insert({
      id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
      fspId: null
    })).rejects.toThrow()
  })
})
