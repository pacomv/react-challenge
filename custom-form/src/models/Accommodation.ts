export enum AccommodationType {
  APARTMENT = "apartment",
  VILLA = "villa",
  HOUSE = "house",
}

export interface Accommodation {
  address: string;
  description?: string;
  name: string;
  photos?: File[];
  type: AccommodationType;
}

export interface Owner {
  name: string;
  email: string;
  phoneNumber?: string;
}
