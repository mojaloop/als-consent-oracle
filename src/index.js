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

const Server = require('./server')
const PJson = require('../package.json')
const { Command } = require('commander')
const Config = require('./lib/config')
const argv = require('./lib/argv').getArgs()

const Program = new Command()

Program
  .version(PJson.version)
  .description('CLI to manage Servers')

Program.command('api')
  .alias('a')
  .description('Start the Transaction Requests API. Use options to specify server type of none to run both') // command description

  // function to execute when command is used
  .action(async () => {
    const options = {
      port: Config.PORT
    }
    module.exports = Server.initialize(options.port)
  })

if (Array.isArray(argv) && argv.length > 1) {
  // parse command line vars
  Program.parse(argv)
} else {
  // display default help
  Program.help()
}
