/**************************************************************************
 *  (C) Copyright Mojaloop Foundation 2020 - All rights reserved.         *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  Original Author:                                                      *
 *       Valentin Genev - valentin.genev@modusbox.com                     *
 *  Contributors:                                                         *
 *       Georgi Georgiev <georgi.georgiev@modusbox.com>                   *
 *       Deon Botha <deon.botha@modusbox.com>                             *
 *       Rajiv Mothilal <rajiv.mothilal@modusbox.com>                     *
 *       Miguel de Barros <miguel.debarros@modusbox.com>                  *
 **************************************************************************/

const Logger = require('@mojaloop/central-services-logger')
const checkEmpty = require('./truthyProperty')
module.exports.plugin = {
  name: 'logger-plugin',
  register: async function (server) {
    server.events.on('log', function (event) {
      if (event.error) {
        event.data = event.error
      }
      if (Array.isArray(event.tags) && event.tags.length === 1 && event.tags[0]) {
        if (event.tags[0] !== 'info') {
          if (!(event.data instanceof Error)) {
            Logger.info(`::::::: ${event.tags[0].toUpperCase()} :::::::`)
            if (event.tags[0] === 'request') {
              const request = event.data
              Logger.info(`:: ${request.method.toUpperCase()} ${request.path}`)
              checkEmpty(request.payload) && Logger.info(`:: Payload: ${JSON.stringify(request.payload)}`)
              checkEmpty(request.params) && Logger.info(`:: Params: ${JSON.stringify(request.params)}`)
              checkEmpty(request.query) && Logger.info(`:: Query: ${JSON.stringify(request.query)}`)
            } else if (event.tags[0] === 'response') {
              Logger.info(`:: Payload: \n${JSON.stringify(event.data.source, null, 2)}`)
            } else {
              Logger.info(`::::::: ${event.tags[0].toUpperCase()} :::::::`)
              Logger.info(event.data)
            }
          } else {
            const error = event.data
            Logger.info(`::::::: ${event.tags[0].toUpperCase()} :::::::\n ${error.stack}`)
          }
          Logger.info(`::: END OF ${event.tags[0].toUpperCase()} ::::`)
        } else {
          Logger.info(event.data)
        }
      }
    })
  }
}
