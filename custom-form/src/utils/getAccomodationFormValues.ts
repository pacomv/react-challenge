import {
  AccommodationFormPhotos,
  AccommodationFormType,
  AccommodationFormValues,
} from "@/models/AccommodationForm";

export function getAccommodationFormValues(
  accommodationForm: AccommodationFormType
) {
  const formValues: AccommodationFormValues = {
    ...accommodationForm,
    accommodation: {
      ...accommodationForm.accommodation,
      photos: getPhotosValues(accommodationForm.accommodation.photos) as File[],
    },
  };
  return formValues;
}

function getPhotosValues(formPhotos: AccommodationFormPhotos) {
  return formPhotos?.map(({ file }) => file);
}
