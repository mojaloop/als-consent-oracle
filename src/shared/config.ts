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

 - Paweł Marzec <pawel.marzec@modusbox.com>
 - Abhimanyu Kapur <abhi.kapur09@gmail.com>
 - Raman Mangla <ramanmangla@google.com>
 - Kenneth Zeng <kkzeng@google.com>
 --------------
 ******/

import Convict from 'convict'
import DBConfig from '~/../config/knexfile'
import PACKAGE from '../../package.json'
import Path from 'path'
import { FileConfig, ServiceConfig } from '../../config/config';

const ConvictConfig = Convict<FileConfig>({
  HOST: {
    doc: 'The Hostname/IP address to bind.',
    format: '*',
    default: '0.0.0.0',
    env: 'HOST',
    arg: 'host'
  },
  PORT: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  INSPECT: {
    DEPTH: {
      doc: 'Inspection depth',
      format: 'nat',
      env: 'INSPECT_DEPTH',
      default: 4
    },
    SHOW_HIDDEN: {
      doc: 'Show hidden properties',
      format: 'Boolean',
      default: false
    },
    COLOR: {
      doc: 'Show colors in output',
      format: 'Boolean',
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

ConvictConfig.loadFile(Path.join(__dirname, '/../../config/default.json'))
ConvictConfig.validate({ allowed: 'strict' })

// Extract simplified config from Convict object
const fileConfig: FileConfig = ConvictConfig.getProperties()

const serviceConfig: ServiceConfig = {
  PORT: fileConfig.PORT,
  HOST: fileConfig.HOST,
  DATABASE: DBConfig,
  INSPECT: fileConfig.INSPECT
}

export default serviceConfig
export {
  PACKAGE,
  ServiceConfig
}
