/*****
 License
 --------------
 Copyright © 2020 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the
 Apache License, Version 2.0 (the 'License') and you may not use these files
 except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop
 files are distributed onan 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 ANY KIND, either express or implied. See the License for the specific language
 governing permissions and limitations under the License.
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

 - Kenneth Zeng <kkzeng@google.com>
 --------------
 ******/

import Convict from 'convict'
import path from 'path'
import { DbConnectionFormat, DbPoolFormat } from './custom-convict-formats'
import { FileConfig, DatabaseConfig } from './config';
const migrationsDirectory = path.join(__dirname, '../migrations')
const seedsDirectory = path.join(__dirname, '../seeds')

Convict.addFormat(DbConnectionFormat)
Convict.addFormat(DbPoolFormat)

const ConvictFileConfig = Convict<FileConfig>({
  PORT: {
    format: Number,
    default: 3000
  },
  HOST: {
    format: String,
    default: '0.0.0.0'
  },
  INSPECT: {
    DEPTH: {
      format: Number,
      default: 4
    },
    SHOW_HIDDEN: {
      format: Boolean,
      default: false
    },
    COLOR: {
      format: Boolean,
      default: true
    }
  },
  DATABASE: {
    DIALECT: {
      doc: 'Which database client should we use',
      format: ['mysql', 'sqlite3'],
      default: null
    },
    HOST: {
      format: String,
      default: 'users'
    },
    PORT: {
      format: Number,
      default: 8000
    },
    USER: {
      format: String,
      default: 'users'
    },
    PASSWORD: {
      format: String,
      default: 'users'
    },
    DATABASE: {
      format: String,
      default: 'users'
    },
    POOL_MIN_SIZE: {
      format: Number,
      default: 8000
    },
    POOL_MAX_SIZE: {
      format: Number,
      default: 8000
    },
    ACQUIRE_TIMEOUT_MILLIS: {
      format: Number,
      default: 8000
    },
    CREATE_TIMEOUT_MILLIS: {
      format: Number,
      default: 8000
    },
    DESTROY_TIMEOUT_MILLIS: {
      format: Number,
      default: 8000
    },
    IDLE_TIMEOUT_MILLIS: {
      format: Number,
      default: 8000
    },
    REAP_INTERVAL_MILLIS: {
      format: Number,
      default: 8000
    },
    CREATE_RETRY_INTERVAL_MILLIS: {
      format: Number,
      default: 8000
    }
  }
})

function areWeTestingWithJest () {
  return process.env.JEST_WORKER_ID !== undefined
}

const ConfigFile = path.join(__dirname, 'default.json')
ConvictFileConfig.loadFile(ConfigFile)
ConvictFileConfig.validate({ allowed: 'strict' })

const ConfigFileProperties = ConvictFileConfig.getProperties()
const KnexDatabaseConfig: DatabaseConfig = {
  client: areWeTestingWithJest() ? 'sqlite3' : ConfigFileProperties.DATABASE.DIALECT,
  version: '5.7',
  connection: areWeTestingWithJest()
    ? ':memory:'
    : {
      host: ConfigFileProperties.DATABASE.HOST,
      port: ConfigFileProperties.DATABASE.PORT,
      user: ConfigFileProperties.DATABASE.USER,
      password: ConfigFileProperties.DATABASE.PASSWORD,
      database: ConfigFileProperties.DATABASE.DATABASE
    },
  useNullAsDefault: !!areWeTestingWithJest(),
  pool: {
    // minimum size
    min: ConfigFileProperties.DATABASE.POOL_MIN_SIZE || 2,

    // maximum size
    max: ConfigFileProperties.DATABASE.POOL_MAX_SIZE || 10,
    // acquire promises are rejected after this many milliseconds
    // if a resource cannot be acquired
    acquireTimeoutMillis: ConfigFileProperties.DATABASE.ACQUIRE_TIMEOUT_MILLIS || 30000,

    // create operations are cancelled after this many milliseconds
    // if a resource cannot be acquired
    createTimeoutMillis: ConfigFileProperties.DATABASE.CREATE_TIMEOUT_MILLIS || 3000,

    // destroy operations are awaited for at most this many milliseconds
    // new resources will be created after this timeout
    destroyTimeoutMillis: ConfigFileProperties.DATABASE.DESTROY_TIMEOUT_MILLIS || 5000,

    // free resources are destroyed after this many milliseconds
    idleTimeoutMillis: ConfigFileProperties.DATABASE.IDLE_TIMEOUT_MILLIS || 30000,

    // how often to check for idle resources to destroy
    reapIntervalMillis: ConfigFileProperties.DATABASE.REAP_INTERVAL_MILLIS || 1000,

    // long long to idle after failed create before trying again
    createRetryIntervalMillis: ConfigFileProperties.DATABASE.CREATE_RETRY_INTERVAL_MILLIS || 20
    // ping: function (conn, cb) { conn.query('SELECT 1', cb) }
  },
  migrations: {
    directory: areWeTestingWithJest() ? '' : 'migrationsDirectory',
    tableName: areWeTestingWithJest() ? 'als-consent-oracle' : 'migration',
    loadExtensions: ['.ts']
  },
  seeds: {
    directory: areWeTestingWithJest() ? '' : seedsDirectory,
    loadExtensions: ['.ts']
  }
}

// Inject directory paths here
KnexDatabaseConfig.migrations.directory = migrationsDirectory
KnexDatabaseConfig.migrations.stub = `${migrationsDirectory}/migration.template`
KnexDatabaseConfig.seeds.directory = seedsDirectory

export default KnexDatabaseConfig
module.exports = KnexDatabaseConfig
