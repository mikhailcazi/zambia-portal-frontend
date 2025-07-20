"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "@/lib/schema/formSchema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"; // uses shadcn/ui checkbox

type FormType = z.infer<typeof FormSchema>;

interface FormCheckboxFieldProps {
  name: "biodiversityHotspot" | "protectedAreaExpansion" | "generatingRevenue";
  label: string;
  form: UseFormReturn<FormType>;
}

export default function FormCheckboxField({
  name,
  label,
  form,
}: FormCheckboxFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="font-normal">{label}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
