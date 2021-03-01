/*****
 License
 --------------
 Copyright © 2020 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
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

 - Kevin Leyow <kevin.leyow@modusbox.com>
 --------------
 ******/

export interface FileConfig {
  PORT: number,
  HOST: string,
  INSPECT: {
    DEPTH: number,
    SHOW_HIDDEN: boolean,
    COLOR: boolean
  },
  DATABASE: {
    DIALECT: string;
    HOST: string;
    PORT: number;
    USER: string;
    PASSWORD: string;
    DATABASE: string;
    POOL_MIN_SIZE: number;
    POOL_MAX_SIZE: number;
    ACQUIRE_TIMEOUT_MILLIS: number;
    CREATE_TIMEOUT_MILLIS: number;
    DESTROY_TIMEOUT_MILLIS: number;
    IDLE_TIMEOUT_MILLIS: number;
    REAP_INTERVAL_MILLIS: number;
    CREATE_RETRY_INTERVAL_MILLIS: number;
  }
}

export interface DbConnection {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export interface DbPool {
  min: number;
  max: number;
  acquireTimeoutMillis: number;
  createTimeoutMillis: number;
  destroyTimeoutMillis: number;
  idleTimeoutMillis: number;
  reapIntervalMillis: number;
  createRetryIntervalMillis: number;
}

export interface DatabaseConfig {
  client: string;
  version?: string;
  useNullAsDefault?: boolean;
  connection: DbConnection | string;
  pool?: DbPool;
  migrations: {
    directory: string;
    tableName: string;
    stub?: string;
    loadExtensions: string[];
  };

  seeds: {
    directory: string;
    loadExtensions: string[];
  };
}

export interface ServiceConfig {
  PORT: number;
  HOST: string;
  DATABASE: DatabaseConfig;
  INSPECT? : {
    DEPTH: number;
    SHOW_HIDDEN: boolean;
    COLOR: boolean;
  };
}
