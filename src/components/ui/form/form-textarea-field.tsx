import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../form";
import { Textarea } from "../textarea";
import * as z from "zod";
import { FormSchema, StringFieldNames } from "@/lib/schema/formSchema";
import { UseFormReturn } from "react-hook-form";

type FormValues = z.infer<typeof FormSchema>;

// Utility to get only keys where value is string

interface TextAreaFieldProps {
  description?: string;
  form: UseFormReturn<FormValues>;
  name: StringFieldNames;
  label: string;
  placeholder: string;
}

function TextAreaField({
  form,
  name,
  label,
  placeholder,
  description,
}: TextAreaFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormDescription>{description || ""}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextAreaField;
