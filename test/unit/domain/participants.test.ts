import { consentDB } from '~/lib/db'

import {
  retrieveConsent,
  createConsent,
  updateConsent,
  deleteConsent }
from '~/domain/participants'

import { logger } from '~/shared/logger'
import { Consent } from '~/model/consent';

jest.mock('~/shared/logger')

// Declare Mocks
const mockInsertConsent = jest.spyOn(consentDB, 'insert')
const mockUpdateConsent = jest.spyOn(consentDB, 'update')
const mockRetrieveConsent = jest.spyOn(consentDB, 'retrieve')
const mockDeleteConsent = jest.spyOn(consentDB, 'delete')
const mockConsent : Consent = {
  id: 'de51442d-f443-49c8-8021-f563daa3206a',
  fspId: 'dfspa'
}

describe('server/domain/consents', (): void => {
  beforeAll((): void => {
    mockInsertConsent.mockResolvedValue(true)
    mockUpdateConsent.mockResolvedValue(1)
    mockDeleteConsent.mockResolvedValue(1)
    mockRetrieveConsent.mockResolvedValue(mockConsent)
  })

  beforeEach((): void => {
    jest.clearAllMocks()
  })

  it('test logger', (): void => {
    expect(logger).toBeDefined()
    expect(logger.push({})).toBeDefined()
  })

  it('createConsent should resolve successfully', async (): Promise<void> => {
    await expect(createConsent(mockConsent))
      .resolves
      .toBe(undefined)
    expect(mockInsertConsent).toHaveBeenCalledWith(mockConsent)
  })

  it('retrieveConsent should resolve successfully', async (): Promise<void> => {
    await expect(retrieveConsent(mockConsent.id))
      .resolves
      .toBe(mockConsent)
    expect(mockRetrieveConsent).toHaveBeenCalledWith(mockConsent.id)
  })

  it('updateConsent should resolve successfully', async (): Promise<void> => {
    await expect(updateConsent(mockConsent))
      .resolves
      .toBe(undefined)

    expect(mockUpdateConsent).toHaveBeenCalledWith(mockConsent)
  })

  it('deleteConsent should resolve successfully', async (): Promise<void> => {
    await expect(deleteConsent(mockConsent.id))
      .resolves
      .toBe(undefined)

    expect(mockDeleteConsent).toHaveBeenCalledWith(mockConsent.id)
  })
})
