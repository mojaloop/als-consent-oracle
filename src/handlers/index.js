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

const OpenapiBackend = require('@mojaloop/central-services-shared').Util.OpenapiBackend
const participants = require('./participants')
const participantsTypeId = require('./participants/{Type}/{ID}')
const health = require('./health')

module.exports = {
  HealthGet: health.get,
  validationFail: OpenapiBackend.validationFail,
  notFound: OpenapiBackend.notFound,
  methodNotAllowed: OpenapiBackend.methodNotAllowed,
  ParticipantsPost: participants.post,
  ParticipantsByTypeAndIDGet: participantsTypeId.get,
  ParticipantsByTypeAndIDPost: participantsTypeId.post,
  ParticipantsByTypeAndIDPut: participantsTypeId.put,
  ParticipantsByTypeAndIDDelete: participantsTypeId.delete
}
