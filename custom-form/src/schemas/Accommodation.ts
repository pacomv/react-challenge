import { AccommodationType } from "@/models/Accommodation";
import { AccommodationFormType } from "@/models/AccommodationForm";
import { checkIsPhoneValid } from "@/utils/checkIsPhoneValid";
import { getNationalPhoneNumber } from "@/utils/getNationalPhoneNumber";
import { z } from "zod";

// PHOTOS
export const photosSchema = z
  .array(z.object({ fileId: z.number(), file: z.instanceof(File).optional() }))
  .max(2)
  .refine(
    (files) => {
      if (files) {
        return files.every(
          ({ file }) => !file || file?.type?.startsWith("image/")
        );
      }
      return true;
    },
    { message: "Only image files are allowed" }
  );

// ACCOMMODATION
const accommodationSchema = z.object({
  address: z
    .string()
    .min(4, { message: "Address must be at least 4 characters long" })
    .max(128, { message: "Address cannot exceed 128 characters" }),
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" })
    .max(128, { message: "Name cannot exceed 128 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  type: z.enum([
    AccommodationType.APARTMENT,
    AccommodationType.HOUSE,
    AccommodationType.VILLA,
  ]),
  description: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || (value.trim()?.length >= 128 && value.trim()?.length <= 2048),
      {
        message:
          "Description must be at least 128 characters long and at most 2048 characters long",
      }
    ),
  photos: photosSchema,
});

// OWNER
const ownerSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" })
    .max(64, { message: "Name cannot exceed 64 characters" }),
  phoneNumber: z.string().refine(
    (phone) => {
      try {
        return (
          (getNationalPhoneNumber(phone ?? "") && checkIsPhoneValid(phone)) ||
          !getNationalPhoneNumber(phone ?? "")
        );
      } catch (error) {
        console.log("The phone input value has not been filled in.", error);
        return true;
      }
    },
    {
      message: "Invalid phone number",
    }
  ),
});

// FORM
export const formSchema = z.object({
  accommodation: accommodationSchema,
  owner: ownerSchema,
});

// DEFAULT FORM VALUES
export const defaultValues: AccommodationFormType = {
  accommodation: {
    address: "",
    name: "",
    type: AccommodationType.APARTMENT,
    description: "",
    photos: [{ fileId: 1 }, { fileId: 2 }],
  },
  owner: {
    email: "",
    name: "",
    phoneNumber: "",
  },
};
