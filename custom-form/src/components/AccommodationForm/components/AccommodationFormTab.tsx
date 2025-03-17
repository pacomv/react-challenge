import { AccommodationType } from "@/models/Accommodation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { ImageInput } from "../../ui/image-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { getAccommodationTypeLabel } from "@/utils/getAccommodationFormLabel";

export const AccommodationFormTab = () => {
  const MAX_WIDTH = 500;
  const MAX_HEIGHT = 500;

  const form = useFormContext();
  const { fields } = useFieldArray({
    control: form.control,
    name: "accommodation.photos",
  });

  return (
    <div className="h-full space-y-8">
      <FormField
        control={form.control}
        name="accommodation.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="accommodation.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="accommodation.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} className="max-h-[300px]" maxLength={2048} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="accommodation.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(AccommodationType).map((value) => (
                  <SelectItem key={value} value={value}>
                    {getAccommodationTypeLabel(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex space-x-4">
        {fields.map(({ id }, index) => (
          <FormItem key={id}>
            <FormLabel>{`Photo ${index + 1}`}</FormLabel>
            <ImageInput
              maxHeight={MAX_HEIGHT}
              maxWidth={MAX_WIDTH}
              onDrop={(acceptedFiles, fileRejections) => {
                form.setValue(
                  `accommodation.photos.${index}.file`,
                  acceptedFiles[0]
                );
                const errorMessage =
                  fileRejections?.[0]?.errors?.[0]?.message ?? "";
                if (errorMessage) {
                  form.setError(`accommodation.photos.${index}`, {
                    message: errorMessage,
                    type: "manual",
                  });
                } else {
                  form.clearErrors(`accommodation.photos.${index}`);
                }
              }}
              onRemove={() => {
                form.setValue(`accommodation.photos.${index}.file`, undefined);
                form.clearErrors(`accommodation.photos.${index}`);
              }}
            />
          </FormItem>
        ))}
      </div>
      <div className="mb-8">
        {
          //@ts-expect-error ts_error
          form.formState.errors.accommodation?.photos?.map((file, index) => (
            <FormMessage className="mb-2">{`Photo ${index + 1}: ${
              file?.message
            }`}</FormMessage>
          ))
        }
      </div>
    </div>
  );
};
