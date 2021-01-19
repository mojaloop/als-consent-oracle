import * as Knex from "knex";


export function up (knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTableIfNotExists('Consent', (t: Knex.CreateTableBuilder): void => {
    t.increments('id').primary().notNullable()
    t.string('fspId', 32).notNullable()
    t.string('consentId', 32).notNullable()
  })
}

export function down (knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTableIfExists('Consent')
}
