import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import { Context } from '~/server/plugins'
import { retrieveConsent, createConsent, updateConsent, deleteConsent } from '~/domain/participants'
import { Schemas } from '@mojaloop/api-snippets/lib/v1_1'
import { Consent } from '~/model/consent'
import * as Types from '~/interface/types'
import { IDTypeNotSupported } from '../../../../model/errors'
import Boom from '@hapi/boom'

export async function get (
  _context: Context,
  request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  if (request.params.Type !== 'CONSENT') {
    return Boom.boomify(new IDTypeNotSupported())
  }

  const consentId = request.params.ID
  const consent = await retrieveConsent(consentId)
  return h.response({ partyList: [consent] }).code(200)
}

export async function post (
  _context: Context,
  request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  if (request.params.Type !== 'CONSENT') {
    return Boom.boomify(new IDTypeNotSupported())
  }

  const consentId = request.params.ID
  const payload = request.payload as Schemas.ParticipantsTypeIDSubIDPostRequest
  const consent : Consent = {
    id: consentId,
    fspId: payload.fspId
  }
  await createConsent(consent)
  return h.response().code(201)
}

export async function put (
  _context: Context,
  request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  if (request.params.Type !== 'CONSENT') {
    return Boom.boomify(new IDTypeNotSupported())
  }

  const consentId = request.params.ID
  const payload = request.payload as Types.ParticipantsTypeIDSubIDPut
  const consent : Consent = {
    id: consentId,
    fspId: payload.fspId
  }
  await updateConsent(consent)
  return h.response().code(200)
}

export async function del (
  _context: Context,
  request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  if (request.params.Type !== 'CONSENT') {
    return Boom.boomify(new IDTypeNotSupported())
  }

  const consentId = request.params.ID
  await deleteConsent(consentId)
  return h.response().code(204)
}

export default {
  get,
  post,
  put,
  del
}
