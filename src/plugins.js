/**************************************************************************
 *  (C) Copyright Mojaloop Foundation 2020 - All rights reserved.         *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  Original Author:                                                      *
 *       Rajiv Mothilal - rajiv.mothilal@modusbox.com                     *
 **************************************************************************/
'use strict'

const Package = require('../package')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Blipp = require('blipp')
const ErrorHandling = require('@mojaloop/central-services-error-handling')
const EventPlugin = require('@mojaloop/central-services-shared').Util.Hapi.HapiEventPlugin
const OpenapiBackendValidator = require('@mojaloop/central-services-shared').Util.Hapi.OpenapiBackendValidator
const registerPlugins = async (server, openAPIBackend) => {
  await server.register(OpenapiBackendValidator)

  await server.register({
    plugin: require('hapi-swagger'),
    options: {
      info: {
        title: 'Event Sidecar Swagger Documentation',
        version: Package.version
      }
    }
  })

  await server.register({
    plugin: require('@hapi/good'),
    options: {
      ops: {
        interval: 10000
      }
    }
  })

  await server.register({
    plugin: {
      name: 'openapi',
      version: '1.0.0',
      multiple: true,
      register: function (server, options) {
        server.expose('openapi', options.openapi)
      }
    },
    options: {
      openapi: openAPIBackend
    }
  })

  await server.register([Inert, Vision, Blipp, ErrorHandling, EventPlugin])
}

module.exports = {
  registerPlugins
}
