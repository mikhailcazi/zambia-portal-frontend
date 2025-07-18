import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import * as z from "zod";

import { FormSchema } from "@/lib/schema/formSchema";

type FormValues = z.infer<typeof FormSchema>;

// Utility to get only keys where value is string
type StringFieldNames =
  | "projectName"
  | "contactPerson"
  | "location"
  | "status"
  | "contactDetails.site.name"
  | "contactDetails.site.capacity"
  | "contactDetails.site.phone"
  | "contactDetails.site.email"
  | "contactDetails.advisors.name"
  | "contactDetails.advisors.phone"
  | "contactDetails.advisors.email"
  | "website"
  | "partners"
  | "description"
  | "problems"
  | "solution"
  | "priorities"
  | "outcomes"
  | "challenges";

interface TextFieldProps {
  type?: string;
  form: UseFormReturn<FormValues>;
  name: StringFieldNames;
  label: string;
  placeholder: string;
}

function TextField({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: TextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextField;
