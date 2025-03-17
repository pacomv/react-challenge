import { ImageInput } from "@/components/ui/image-input";
import { Label } from "@/components/ui/label";
import { AccommodationFormType } from "@/models/AccommodationForm";
import { checkIsPhoneValid } from "@/utils/checkIsPhoneValid";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { getAccommodationTypeLabel } from "@/utils/getAccommodationFormLabel";
import { useFormContext } from "react-hook-form";

export const SummaryTab = () => {
  const form = useFormContext();

  const { accommodation, owner } = form.getValues() as AccommodationFormType;
  const isPhoneValid = checkIsPhoneValid(owner.phoneNumber ?? "");

  return (
    <div className="h-full space-y-8">
      <h2 className="scroll-m-20 text-xl font-bold text-start">
        Accommodation
      </h2>
      <div className="grid gap-2">
        <Label>Name</Label>
        <p className="text-start">{accommodation.name}</p>
      </div>
      <div className="grid gap-2">
        <Label>Address</Label>
        <p className="text-start">{accommodation.address}</p>
      </div>
      <div className="grid gap-2">
        <Label>Description</Label>
        <p className="text-start leading-7 [&:not(:first-child)]:mt-6">
          {accommodation.description}
        </p>
      </div>
      <div className="grid gap-2">
        <div className="flex space-x-4">
          {accommodation.photos.map(({ fileId, file }, index) => (
            <div key={fileId} className="grid gap-2">
              <Label>Photo {index + 1}</Label>
              <ImageInput initialFile={file} disabled />
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Type</Label>
        <p className="text-start">
          {getAccommodationTypeLabel(accommodation.type)}
        </p>
      </div>
      <h2 className="scroll-m-20 text-xl font-bold text-start">Owner</h2>
      <div className="grid gap-2">
        <Label>Name</Label>
        <p className="text-start">{owner.name}</p>
      </div>
      <div className="grid gap-2">
        <Label>Email</Label>
        <p className="text-start">{owner.email}</p>
      </div>
      <div className="grid gap-2">
        <Label>Phone</Label>
        <p className="text-start">
          {isPhoneValid ? formatPhoneNumber(owner.phoneNumber ?? "") : ""}
        </p>
      </div>
    </div>
  );
};
