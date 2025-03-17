import { formSchema, photosSchema } from "@/schemas/Accommodation";
import { z } from "zod";

export type AccommodationFormType = z.infer<typeof formSchema>;
export type AccommodationFormPhotos = z.infer<typeof photosSchema>;
export type AccommodationFormValues = {
  accommodation: {
    address: string;
    description?: string;
    name: string;
    photos: File[];
  };
  owner: {
    email: string;
    name: string;
    phoneNumber?: string;
  };
};
export enum FormTab {
  ACCOMMODATION = "accommodation",
  OWNER = "owner",
  SUMMARY = "summary",
}
export const nextSteps: Record<FormTab, FormTab> = {
  [FormTab.ACCOMMODATION]: FormTab.OWNER,
  [FormTab.OWNER]: FormTab.SUMMARY,
  [FormTab.SUMMARY]: FormTab.SUMMARY,
};
export const previousSteps: Record<FormTab, FormTab> = {
  [FormTab.SUMMARY]: FormTab.OWNER,
  [FormTab.OWNER]: FormTab.ACCOMMODATION,
  [FormTab.ACCOMMODATION]: FormTab.ACCOMMODATION,
};
