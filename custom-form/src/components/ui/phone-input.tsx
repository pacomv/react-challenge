import {
  PhoneInput as InternationalPhoneInput,
  PhoneInputProps,
} from "react-international-phone";
import "react-international-phone/style.css";
import { cn } from "@/lib/utils";

function PhoneInput(props: PhoneInputProps) {
  return (
    <InternationalPhoneInput
      inputProps={{
        className: cn(
          "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-r-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        ),
      }}
      {...props}
    />
  );
}

export { PhoneInput };
