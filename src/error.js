
'use strict'

const Boom = require('@hapi/boom')

const responses = {
  // Investigate why central-services-error-handling turns 404's into method not allowed errors
  // Should we be even using central-services-error-handling as a plugin for the
  // oracle?
  FSP_NOT_FOUND: () => Boom.notFound('FSP not found'),
  PARTY_NOT_FOUND: () => Boom.notFound('Party not found'),
  ID_TYPE_NOT_SUPPORTED: () => Boom.notImplemented('This service supports only CONSENT ID types')
}

module.exports = responses
