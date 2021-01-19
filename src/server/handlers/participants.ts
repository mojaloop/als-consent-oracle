
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { Context } from '~/server/plugins';

export async function post (
  _context: Context,
  _request: Request,
  h: ResponseToolkit): Promise<ResponseObject> {
  return h.response().code(201)
}

export default {
  post
}
