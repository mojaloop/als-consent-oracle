import Knex from 'knex'
import Config from '~/shared/config'
import ConsentDB, { Consent } from '../../../src/model/consent'
import { NotFoundError } from '../../../src/model/errors'

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
 * Consent Resource Model Integration Tests
 */
describe('src/model/consent', (): void => {
  let Db: Knex
  let consentDB: ConsentDB

  beforeAll(async (): Promise<void> => {
    Db = Knex(Config.DATABASE as object)

    consentDB = new ConsentDB(Db)
    await Db.seed.run()
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
      await expect(consentDB.update(updatedConsent)).rejects.toThrowError(NotFoundError)
    })
  })

  describe('retrieve', (): void => {
    it('retrieves an existing consent', async (): Promise<void> => {
      await Db<Consent>('Consent').insert(exampleConsent)

      const consent: Consent = await consentDB.retrieve(exampleConsent.id)

      expect(consent).toEqual(expect.objectContaining(exampleConsent))
    })

    it('throws an error on retrieving non-existent consent', async (): Promise<void> => {
      await expect(consentDB.retrieve(exampleConsent.id)).rejects.toThrowError(NotFoundError)
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
      await expect(consentDB.delete(exampleConsent.id)).rejects.toThrowError(NotFoundError)
    })
  })
})
