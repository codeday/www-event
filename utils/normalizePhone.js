import { phone } from 'phone';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
const pnUtil = PhoneNumberUtil.getInstance();

export function normalizePhone(phoneNumberEntered, { iso3166Alpha3Code }) {
  const hasCountryCode = phoneNumberEntered.charAt(0) === '+';

  // We have to use the `phone` library because it's what the server uses
  const { phoneNumber, isValid } = phone(phoneNumberEntered, {
    country: hasCountryCode ? null : (iso3166Alpha3Code || 'USA'),
    validateMobilePrefix: true,
    strictDetection: false,
  });
  if (!isValid) return { phoneNumber: null, isValid };

  // Use Google's library for formatting
  const pnGoogle = pnUtil.parse(phoneNumber);
  return {
    phoneNumber: pnUtil.format(pnGoogle, PhoneNumberFormat.INTERNATIONAL),
    isValid: true,
  }
}
