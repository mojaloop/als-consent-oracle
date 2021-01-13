/**************************************************************************
 *  (C) Copyright Mojaloop Foundation 2020 - All rights reserved.         *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  Original Author:                                                      *
 *       Lewis Daly - lewisd@crosslaketech.com                            *
 **************************************************************************/

/**
 * @name getArgs
 *
 * @description Provide a mockable way to override the process.argv
 *
 * @returns {Array<String>} - A list of the process args
 */
const getArgs = () => {
  return process.argv
}

module.exports = {
  getArgs
}
