import { ResponseToolkit, ResponseObject, Request } from '@hapi/hapi';

/*
 * Mock Request Resources
 */

// @ts-ignore
export const h: ResponseToolkit = {
  response: (): ResponseObject => {
    return {
      code: (num: number): ResponseObject => {
        return {
          statusCode: num
        } as unknown as ResponseObject
      }
    } as unknown as ResponseObject
  }
}

// @ts-ignore
export const postParticipantsRequest: Request = {
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
    requestId: 'b56b4406-c432-45d1-aae1-d8c00ec903b3',
    partyList: [
      {
        'partyIdType': 'CONSENT',
        'partyIdentifier': '256d5bbc-535c-4060-890b-ff7a06e781f4',
        'fspId': 'dfspa'
      }
    ]
  }
}

/*
 * Mock Consent Resources
 */
