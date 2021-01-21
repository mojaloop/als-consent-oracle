import { consentDB } from '~/lib/db';
import { Consent } from '~/model/consent';

export async function retrieveConsent (
  consentId: string
  ): Promise<Consent> {
  const consent: Consent = await consentDB.retrieve(consentId)
  return consent
}
