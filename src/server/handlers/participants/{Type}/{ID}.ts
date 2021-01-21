import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { Context } from '~/server/plugins';
import Boom from '@hapi/boom';
import { retrieveConsent } from '~/domain/participants/{Type}/{ID}';

export async function get (
  _context: Context,
  request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  if (request.params.Type !== 'CONSENT') {
    return Boom.notImplemented() as unknown as ResponseObject
  }
  const consentId = request.params.ID
  const consent = await retrieveConsent(consentId)
  return h.response(consent).code(200)
}

export async function post (
  _context: Context,
  _request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  return h.response().code(201)
}

export async function put (
  _context: Context,
  _request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  return h.response().code(200)
}

export async function del (
  _context: Context,
  _request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  return h.response().code(204)
}

export default {
  get,
  post,
  put,
  del
}
