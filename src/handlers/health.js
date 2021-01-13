/**************************************************************************
 *  (C) Copyright Mojaloop Foundation 2020 - All rights reserved.         *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  Original Author:                                                      *
 *       Kevin Leyow - kevin.leyow@modusbox.com                           *
 **************************************************************************/
'use strict'

const HealthCheck = require('@mojaloop/central-services-shared').HealthCheck.HealthCheck
const packageJson = require('../../package.json')

const healthCheck = new HealthCheck(packageJson, [])

/**
 * Operations on /health
 */
module.exports = {
  /**
   * summary: Get Server
   * description: The HTTP request GET /health is used to return the current status of the API.
   * parameters:
   * produces: application/json
   * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
   */
  get: async (context, request, h) => {
    return h.response(await healthCheck.getHealth()).code(200)
  }
}
