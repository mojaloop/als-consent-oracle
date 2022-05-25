import { NotFoundError } from '../errors'
import { Knex } from 'knex'

/*
 * Interface for Consent resource type
 */
export interface Consent {
  id: string
  fspId: string
}

/*
 * Class to abstract Consent DB operations
 */
export class ConsentDB {
  // Knex instance
  private Db: Knex

  public constructor(dbInstance: Knex) {
    this.Db = dbInstance
  }

  // Add initial Consent parameters
  // Error bubbles up in case of primary key violation
  public async insert(consent: Consent | Array<Consent>): Promise<boolean> {
    // Returns [0] for MySQL-Knex and [Row Count] for SQLite-Knex
    await this.Db<Consent>('Consent').insert(consent)

    return true
  }

  // Update Consent
  public async update(consent: Consent): Promise<number> {
    // Returns number of updated rows
    // Transaction to make the update atomic
    return this.Db.transaction(async (trx): Promise<number> => {
      // Transaction is rolled back automatically if there is
      // an error and the returned promise is rejected
      const consents: Consent[] = await trx<Consent>('Consent').select('*').where({ id: consent.id }).limit(1)

      if (consents.length === 0) {
        throw new NotFoundError('Consent', consent.id)
      }

      const existingConsent: Consent = consents[0]
      const updatedConsent: Record<string, string | Date> = {}

      // Prepare a new Consent with only allowable updates
      Object.keys(existingConsent).forEach((key): void => {
        updatedConsent[key] = consent[key as keyof Consent] as string | Date
      })

      return trx<Consent>('Consent').where({ id: consent.id }).update(updatedConsent)
    })
  }

  // Retrieve Consent by ID (unique)
  public async retrieve(id: string): Promise<Consent> {
    // Returns array containing consents
    const consents: Consent[] = await this.Db<Consent>('Consent').select('*').where({ id: id }).limit(1)

    if (consents.length === 0) {
      throw new NotFoundError('Consent', id)
    }

    return consents[0]
  }

  // Delete Consent by ID
  // Deleting Consent automatically deletes associates scopes
  public async delete(id: string): Promise<number> {
    // Returns number of deleted rows
    const deleteCount: number = await this.Db<Consent>('Consent').where({ id: id }).del()

    if (deleteCount === 0) {
      throw new NotFoundError('Consent', id)
    }

    return deleteCount
  }
}
