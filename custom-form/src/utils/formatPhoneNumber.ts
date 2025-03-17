import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export function formatPhoneNumber(phone: string) {
  const number = phoneUtil.parseAndKeepRawInput(phone);
  return phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL);
}
