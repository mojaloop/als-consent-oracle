import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void | Knex.SchemaBuilder> {
  return knex.schema.hasTable('Consent')
    .then((exists: boolean): Knex.SchemaBuilder | void => {
      if (!exists) {
        return knex.schema.createTable('Consent',
          (t: Knex.CreateTableBuilder): void => {
            t.uuid('id').primary().notNullable()
            t.string('fspId', 32).notNullable()
          })
      }
  })
}

export function down (knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTableIfExists('Consent')
}
