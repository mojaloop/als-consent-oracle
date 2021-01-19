import Convict from 'convict'
import DBConfig, { DatabaseConfig } from '~/../config/knexfile'
import PACKAGE from '../../package.json'

interface ServiceConfig {
  PORT: number;
  HOST: string;
  DATABASE?: DatabaseConfig;
  ENV: string;
  INSPECT: {
    DEPTH: number;
    SHOW_HIDDEN: boolean;
    COLOR: boolean;
  };
}

const ConvictConfig = Convict<ServiceConfig>({
  ENV: {
    doc: 'The environment that the auth-service is running in',
    format: ['development', 'test', 'production', 'integration'],
    default: 'production',
    env: 'NODE_ENV'
  },
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
  }
})

// Load and validate general config based on environment variable
const env = ConvictConfig.get('ENV')

ConvictConfig.loadFile(`${__dirname}/../../config/${env}.json`)
ConvictConfig.validate({ allowed: 'strict' })

// Extract simplified config from Convict object
const config: ServiceConfig = ConvictConfig.getProperties()

// Inject DBConfig into shared config
config.DATABASE = DBConfig

export default config
export {
  PACKAGE,
  ServiceConfig,
  DatabaseConfig
}
