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

 - Raman Mangla <ramanmangla@google.com>
 --------------
 ******/

/*
 * Tests for MySQL Timestamp field return type to Date object and
 * its value (including time zone) need to be implemented.
 * SQLite doesn't support native timestamp or typecasting and
 * returns ISO strings for timestamp field.
 * Thus, testing environment (SQLite) differs from Production environment.
 */

import { knex, Knex } from 'knex'
import Config, { DatabaseConfig } from '~/shared/config'
import ConsentDB, { Consent } from '~/model/consent'
import { NotFoundError } from '~/model/errors'

Config.DATABASE.client = 'sqlite3'
Config.DATABASE.connection = ':memory:'
Config.DATABASE.useNullAsDefault = true
Config.DATABASE.migrations = {
  directory: Config.DATABASE.migrations.directory,
  stub: Config.DATABASE.migrations.stub,
  tableName: 'auth-service',
  loadExtensions: ['.ts']
}
Config.DATABASE.seeds = {
  directory: Config.DATABASE.migrations.directory,
  loadExtensions: ['.ts']
}

/*
 * Mock Consent Resources
 */
const exampleConsent: Consent = {
  id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
  fspId: 'dfspa'
}

const expectedConsent: Consent = {
  id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
  fspId: 'dfspa'
}

const updatedConsent: Consent = {
  id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
  fspId: 'dfspb'
}

/*
 * Consent Resource Model Unit Tests
 */
describe('src/model/consent', (): void => {
  let Db: Knex
  let consentDB: ConsentDB

  beforeAll(async (): Promise<void> => {
    Db = knex(Config.DATABASE as DatabaseConfig)
    await Db.migrate.latest()
    await Db.raw('PRAGMA foreign_keys = ON')

    consentDB = new ConsentDB(Db)
  })

  afterAll(async (): Promise<void> => {
    Db.destroy()
  })

  // Reset table for new test
  beforeEach(async (): Promise<void> => {
    await Db<Consent>('Consent').del()
  })

  describe('insert', (): void => {
    it('adds consent to the database', async (): Promise<void> => {
      const inserted: boolean = await consentDB.insert(exampleConsent)

      expect(inserted).toEqual(true)

      const consents: Consent[] = await Db<Consent>('Consent').select('*').where({
        id: exampleConsent.id
      })

      expect(consents.length).toEqual(1)
      expect(consents[0]).toEqual(expectedConsent)
    })

    it('throws an error on adding a consent with existing consentId', async (): Promise<void> => {
      const inserted: boolean = await consentDB.insert(exampleConsent)

      expect(inserted).toEqual(true)

      const consents: Consent[] = await Db<Consent>('Consent').select('*').where({
        id: exampleConsent.id
      })

      // Consent has been added
      expect(consents[0]).toEqual(expectedConsent)

      // Fail primary key constraint
      await expect(consentDB.insert(exampleConsent)).rejects.toThrow()
    })

    it('throws an error on adding consent without an id', async (): Promise<void> => {
      const consentWithoutId: Consent = {
        id: null as unknown as string,
        fspId: 'dfspa'
      }

      await expect(consentDB.insert(consentWithoutId)).rejects.toThrow()
    })
  })

  describe('update', (): void => {
    it('updates existing consent from a consent having only required fields', async (): Promise<void> => {
      // Inserting record to update
      await Db<Consent>('Consent').insert(exampleConsent)

      // Update only selected fields of inserted record
      const updateCount: number = await consentDB.update(updatedConsent)

      expect(updateCount).toEqual(1)

      const consents: Consent[] = await Db<Consent>('Consent').select('*').where({
        id: updatedConsent.id
      })

      expect(consents[0].id).toEqual(updatedConsent.id)
      expect(consents[0]).toEqual(expect.objectContaining(updatedConsent))
    })

    it('throws an error on updating non-existent consent', async (): Promise<void> => {
      await expect(consentDB.update(updatedConsent)).rejects.toThrow(NotFoundError)
    })
  })

  describe('retrieve', (): void => {
    it('retrieves an existing consent', async (): Promise<void> => {
      await Db<Consent>('Consent').insert(exampleConsent)

      const consent: Consent = await consentDB.retrieve(exampleConsent.id)

      expect(consent).toEqual(expect.objectContaining(exampleConsent))
    })

    it('throws an error on retrieving non-existent consent', async (): Promise<void> => {
      await expect(consentDB.retrieve(exampleConsent.id)).rejects.toThrow(NotFoundError)
    })
  })

  describe('delete', (): void => {
    it('deletes an existing consent', async (): Promise<void> => {
      await Db<Consent>('Consent').insert(exampleConsent)

      let consents: Consent[] = await Db<Consent>('Consent').select('*').where({
        id: exampleConsent.id
      })

      // Inserted properly
      expect(consents.length).toEqual(1)

      const deleteCount: number = await consentDB.delete(exampleConsent.id)

      expect(deleteCount).toEqual(1)

      consents = await Db<Consent>('Consent').select('*').where({
        id: exampleConsent.id
      })

      // Deleted properly
      expect(consents.length).toEqual(0)
    })

    it('throws an error on deleting non-existent consent', async (): Promise<void> => {
      await expect(consentDB.delete(exampleConsent.id)).rejects.toThrow(NotFoundError)
    })
  })
})
