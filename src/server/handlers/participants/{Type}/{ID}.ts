import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'

function get (_context: any, _request: Request, _h: ResponseToolkit): any {
  return Boom.notImplemented()
}


function post (_context: any, _request: Request, _h: ResponseToolkit): any {
  return Boom.notImplemented()
}

function put (_context: any, _request: Request, _h: ResponseToolkit): any {
  return Boom.notImplemented()
}

function del (_context: any, _request: Request, _h: ResponseToolkit): any {
  return Boom.notImplemented()
}

export default {
  get,
  post,
  put,
  del
}
