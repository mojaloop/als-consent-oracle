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
const RC = require('parse-strings-in-object')(require('rc')('ALS', require('../config/default.json')))

const getOrDefault = (value, defaultValue) => {
  if (value === undefined) {
    return defaultValue
  }

  return value
}

const config = {
  SERVER_PORT: RC.SERVER_PORT,
  DATABASE: {
    client: RC.DATABASE.DIALECT,
    connection: {
      host: RC.DATABASE.HOST.replace(/\/$/, ''),
      port: RC.DATABASE.PORT,
      user: RC.DATABASE.USER,
      password: RC.DATABASE.PASSWORD,
      database: RC.DATABASE.DATABASE
    },
    pool: {
      // minimum size
      min: getOrDefault(RC.DATABASE.POOL_MIN_SIZE, 2),

      // maximum size
      max: getOrDefault(RC.DATABASE.POOL_MAX_SIZE, 10),
      // acquire promises are rejected after this many milliseconds
      // if a resource cannot be acquired
      acquireTimeoutMillis: getOrDefault(RC.DATABASE.ACQUIRE_TIMEOUT_MILLIS, 30000),

      // create operations are cancelled after this many milliseconds
      // if a resource cannot be acquired
      createTimeoutMillis: getOrDefault(RC.DATABASE.CREATE_TIMEOUT_MILLIS, 3000),

      // destroy operations are awaited for at most this many milliseconds
      // new resources will be created after this timeout
      destroyTimeoutMillis: getOrDefault(RC.DATABASE.DESTROY_TIMEOUT_MILLIS, 5000),

      // free resouces are destroyed after this many milliseconds
      idleTimeoutMillis: getOrDefault(RC.DATABASE.IDLE_TIMEOUT_MILLIS, 30000),

      // how often to check for idle resources to destroy
      reapIntervalMillis: getOrDefault(RC.DATABASE.REAP_INTERVAL_MILLIS, 1000),

      // long long to idle after failed create before trying again
      createRetryIntervalMillis: getOrDefault(RC.DATABASE.CREATE_RETRY_INTERVAL_MILLIS, 20)
      // ping: function (conn, cb) { conn.query('SELECT 1', cb) }
    },
    debug: getOrDefault(RC.DATABASE.DEBUG, false)
  },
  LOG_LEVEL: RC.LOG_LEVEL
}

module.exports = config
