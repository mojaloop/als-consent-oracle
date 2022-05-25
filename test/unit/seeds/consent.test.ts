import Config, { DatabaseConfig } from '~/shared/config'
import { knex, Knex } from 'knex'

Config.DATABASE.client = 'sqlite3'
Config.DATABASE.connection = ':memory:'
Config.DATABASE.useNullAsDefault = true

describe('testing Consent table', (): void => {
  let db: Knex<unknown[]>

  beforeAll(async (): Promise<void> => {
    db = knex(Config.DATABASE as DatabaseConfig)
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
    db = knex(Config.DATABASE as DatabaseConfig)
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async (): Promise<void> => {
    db.destroy()
  })

  it('should properly enforce the primary key constraint in the Consent table', async (): Promise<void> => {
    expect(db).toBeDefined()
    /* Tests for duplication */
    await expect(
      db.from('Consent').insert({
        id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
        fspId: 'dfspa'
      })
    ).rejects.toThrow()
    /* Tests for non-nullity */
    await expect(
      db.from('Consent').insert({
        id: null,
        fspId: 'dfspa'
      })
    ).rejects.toThrow()
  })
  it('should properly enforce the non-nullable constraint for fspId', async (): Promise<void> => {
    expect(db).toBeDefined()
    await expect(
      db.from('Consent').insert({
        id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
        fspId: null
      })
    ).rejects.toThrow()
  })
})
