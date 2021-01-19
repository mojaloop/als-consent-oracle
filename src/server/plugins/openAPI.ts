import Path from 'path'
import Shared from '@mojaloop/central-services-shared';

import Handlers from '../handlers'

const openAPIOptions = {
  api: Path.resolve(__dirname, '../../interface/openapi.yaml'),
  handlers: Handlers,
  extensions: ['ts']
}

export default {
  plugin: Shared.Util.OpenapiBackend,
  options: openAPIOptions
}
