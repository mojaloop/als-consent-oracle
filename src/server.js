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
const OpenapiBackend = require('@mojaloop/central-services-shared').Util.OpenapiBackend
const ErrorHandler = require('@mojaloop/central-services-error-handling')
const Path = require('path')

const Handlers = require('./handlers')
const Plugins = require('./plugins')

module.exports.createServer = async function (port, oracleDb) {
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

    server.app.db = oracleDb

    // add a health-check endpoint on /
    server.app.healthCheck = async () => {
      // Check database connectivity is ok
      if (await server.app.db.isConnected()) {
        return true
      }
    }

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
