import { AccommodationType } from "@/models/Accommodation";

export function getAccommodationTypeLabel(value: AccommodationType) {
  const labels: Record<AccommodationType, string> = {
    [AccommodationType.APARTMENT]: "Apartment",
    [AccommodationType.HOUSE]: "House",
    [AccommodationType.VILLA]: "Villa",
  };
  return labels[value];
}
