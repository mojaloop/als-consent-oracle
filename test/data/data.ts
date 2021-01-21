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
  method: 'post',
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
export const getParticipantsByTypeAndIDRequest: Request = {
  method: 'get',
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
  },
  params: {
    ID: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
    Type: 'CONSENT'
  }
}

// @ts-ignore
export const postParticipantsByTypeAndIDRequest: Request = {
  method: 'post',
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
    "currency": "USD",
    "fspId": "dfspa"
  },
  params: {
    ID: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
    Type: 'CONSENT'
  }
}

// @ts-ignore
export const putParticipantsByTypeAndIDRequest: Request = {
  method: 'put',
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
    "currency": "USD",
    "fspId": "dfspa"
  },
  params: {
    ID: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
    Type: 'CONSENT'
  }
}

// @ts-ignore
export const deleteParticipantsByTypeAndIDRequest: Request = {
  method: 'delete',
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
  },
  params: {
    ID: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
    Type: 'CONSENT'
  }
}

// @ts-ignore
export const getParticipantsByWrongTypeAndIDRequest: Request = {
  method: 'get',
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
  },
  params: {
    ID: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
    Type: 'ACCOUNT_ID'
  }
}

// @ts-ignore
export const postParticipantsByWrongTypeAndIDRequest: Request = {
  method: 'post',
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
    "currency": "USD",
    "fspId": "dfspa"
  },
  params: {
    ID: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
    Type: 'ACCOUNT_ID'
  }
}

// @ts-ignore
export const putParticipantsByWrongTypeAndIDRequest: Request = {
  method: 'put',
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
    "currency": "USD",
    "fspId": "dfspa"
  },
  params: {
    ID: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
    Type: 'ACCOUNT_ID'
  }
}

// @ts-ignore
export const deleteParticipantsByWrongTypeAndIDRequest: Request = {
  method: 'delete',
  headers: {
    'fspiop-source': 'als',
    'fspiop-destination': 'als-consent-oracle'
  },
  payload: {
  },
  params: {
    ID: 'e83b456a-8d8b-46cf-bc67-b2e7744bc063',
    Type: 'ACCOUNT_ID'
  }
}

/*
 * Mock Consent Resources
 */
