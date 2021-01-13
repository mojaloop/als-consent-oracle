/**************************************************************************
 *  (C) Copyright Mojaloop Foundation 2020 - All rights reserved.         *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  Original Author:                                                      *
 *       Valentin Genev - valentin.genev@modusbox.com                     *
 **************************************************************************/
'use strict'

const { Server } = require('@hapi/hapi')
const Logger = require('@mojaloop/central-services-logger')
const HeaderValidation = require('@mojaloop/central-services-shared').Util.Hapi.FSPIOPHeaderValidation
const OpenapiBackend = require('@mojaloop/central-services-shared').Util.OpenapiBackend
const ErrorHandler = require('@mojaloop/central-services-error-handling')
const Path = require('path')
const Config = require('./lib/config.js')

const Handlers = require('./handlers')
const Plugins = require('./plugins')

const createServer = async function (port) {
  try {
    const server = await new Server({
      port,
      routes: {
        validate: {
          options: ErrorHandler.validateRoutes()
        }
      }
    })
    const api = await OpenapiBackend.initialise(Path.resolve(__dirname, './interface/openapi.yaml'), Handlers)
    await Plugins.registerPlugins(server, api)
    await server.register([
      {
        plugin: HeaderValidation
      },
      {
        plugin: require('./lib/logger-plugin')
      }
    ])

    server.ext([
      {
        type: 'onPreHandler',
        method: (request, h) => {
          server.log('request', request)
          return h.continue
        }
      },
      {
        type: 'onPreResponse',
        method: (request, h) => {
          if (!request.response.isBoom) {
            server.log('response', request.response)
          } else {
            const error = request.response
            const errorMessage = {
              errorInformation: {
                errorCode: error.statusCode,
                errorDescription: error.message
              }
            }
            error.message = errorMessage
            error.reformat()
          }
          return h.continue
        }
      }
    ])

    // use as a catch-all handler
    server.route({
      method: ['GET', 'POST', 'PUT', 'DELETE'],
      path: '/{path*}',
      handler: (req, h) => {
        return api.handleRequest(
          {
            method: req.method,
            path: req.path,
            body: req.payload,
            query: req.query,
            headers: req.headers
          },
          req,
          h
        )
        // TODO: follow instructions https://github.com/anttiviljami/openapi-backend/blob/master/DOCS.md#postresponsehandler-handler
      }
    })
    await server.start()
    return server
  } catch (e) {
    console.error(e)
  }
}

const initialize = async (port = Config.PORT) => {
  const server = await createServer(port)
  Logger.info(`Server running on ${server.info.host}:${server.info.port}`)
  return server
}

module.exports = {
  initialize
}
