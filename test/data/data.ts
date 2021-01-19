import { Consent } from '~/model/consent'
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

/*
 * Mock Request Resources
 */
// @ts-ignore
export const getParticipantsTypeIDRequest: Request = {
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  params: {
    Type: 'CONSENT',
    ID: 'b5e49311-8119-4669-80c4-5ff6083fc28e'
  }
}

// @ts-ignore
export const postParticipantsTypeIDRequest: Request = {
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  params: {
    Type: 'CONSENT',
    ID: 'b5e49311-8119-4669-80c4-5ff6083fc28e'
  },
  payload: {
    'fspId': 'dfspa'
  }
}

// @ts-ignore
export const putParticipantsTypeIDRequest: Request = {
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  params: {
    Type: 'CONSENT',
    ID: 'b5e49311-8119-4669-80c4-5ff6083fc28e'
  },
  payload: {
    'fspId': 'dfspa'
  }
}

// @ts-ignore
export const deleteParticipantsTypeIDRequest: Request = {
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  params: {
    Type: 'CONSENT',
    ID: '0aeae5ab-d32b-4c23-9de1-57bede32f3e3'
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

/*
 * Mock Consent Resources
 */
export const exampleConsent: Consent = {
  id: '04589955-0f0f-4aaf-b4b9-63c0f1bbec17',
  fspId: 'dfspa'
}
