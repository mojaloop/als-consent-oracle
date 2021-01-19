import Knex from 'knex'
import Config from '../shared/config'
import ConsentDB from '../model/consent'

const Db: Knex = Knex(Config.DATABASE as object)
const consentDB: ConsentDB = new ConsentDB(Db)
const closeKnexConnection = async () => { await Db.destroy() }

export {
  consentDB,
  closeKnexConnection
}
