
import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'

export function post (_context: any, _request: Request, _h: ResponseToolkit): any {
  return Boom.notImplemented()
}

export default {
  post
}
