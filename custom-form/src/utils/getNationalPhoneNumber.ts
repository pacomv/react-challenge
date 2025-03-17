import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export function getNationalPhoneNumber(phone: string) {
  const number = phoneUtil.parseAndKeepRawInput(phone);
  return number.getNationalNumber();
}
