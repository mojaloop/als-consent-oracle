import Knex from 'knex'
import Config from '../../config/knexfile'
import ConsentDB from '../model/consent'

const Db: Knex = Knex(Config.test)
const consentDB: ConsentDB = new ConsentDB(Db)

export {
  consentDB
}
