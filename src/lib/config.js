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

const RC = require('parse-strings-in-object')(require('rc')('ES', require('../../config/default.json')))

module.exports = {
  PORT: RC.PORT,
  HOSTNAME: RC.HOSTNAME,
  DATABASE_URI: RC.DATABASE_URI,
  HUB_PARTICIPANT: RC.HUB_PARTICIPANT
}
