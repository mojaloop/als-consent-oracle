'use strict'
import * as Knex from 'knex'

export const consents = [
  {
    id: 'ab7f9872-d9fe-4aee-a540-fc12f9aad8aa',
    fspId: 'dfspa'
  },
  {
    id: 'd4bfbde1-93d2-45f2-8372-968532dcfa34',
    fspId: 'dfspb'
  },
  {
    id: '04be9a5c-44a2-4a8f-a497-59a7baca849a',
    fspId: 'dfspc'
  }
]

export function seed (knex: Knex): Promise<Knex.QueryBuilder<number[]>> {
  return knex('Consent').del()
    .then(() => knex('Consent').insert(consents))
}
