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

import { FormSchema, StringFieldNames } from "@/lib/schema/formSchema";

type FormValues = z.infer<typeof FormSchema>;

// Utility to get only keys where value is string

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
