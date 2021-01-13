/**************************************************************************
 *  (C) Copyright Mojaloop Foundation 2020 - All rights reserved.         *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  Original Author:                                                      *
 *       Valentin Genev - valentin.genev@modusbox.com                     *
 **************************************************************************/
module.exports = (obj) => {
  if (obj && typeof obj !== 'object') return true
  if (obj && Object.keys(obj).length) {
    for (const key of Object.keys(obj)) {
      if (key && obj[key]) return true
    }
  }
  return false
}
