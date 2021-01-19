import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { Context } from '~/server/plugins';

export async function get (
  _context: Context,
  _request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  return h.response().code(200)
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
