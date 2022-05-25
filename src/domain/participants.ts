import { consentDB } from '~/lib/db'
import { Consent } from '~/model/consent'

export async function retrieveConsent(consentId: string): Promise<Consent> {
  const consent: Consent = await consentDB.retrieve(consentId)
  return consent
}

export async function createConsent(consent: Consent): Promise<void> {
  await consentDB.insert(consent)
}

export async function updateConsent(consent: Consent): Promise<void> {
  await consentDB.update(consent)
}

export async function deleteConsent(consentId: string): Promise<void> {
  await consentDB.delete(consentId)
}
