import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { FormSchema } from "@/lib/schema/formSchema";

type FormValues = z.infer<typeof FormSchema>;

type FormFileUploadFieldProps = {
  name:
    | "companyRegistration"
    | "businessPlan"
    | "financialStatements"
    | "partnerships"
    | "techStudies"
    | "other";
  form: UseFormReturn<FormValues>;
  label: string;
  description?: string;
  multiple?: boolean;
};

export function FormFileUploadFieldSmall({
  name,
  form,
  label,
}: FormFileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleRemove = () => {
          form.setValue(name, []);
          form.clearErrors(name);
        };

        return (
          <FormItem className="grid grid-cols-3">
            <FormLabel className="col-span-2">{label}</FormLabel>
            <FormControl className="col-span-1">
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  className="hidden"
                  ref={inputRef}
                  onChange={(e) => {
                    form.clearErrors(name);
                    const newFiles = e.target.files;
                    if (!newFiles || newFiles.length === 0) return;
                    const fileToAdd = newFiles[0];
                    form.setValue(name, [fileToAdd]);
                    e.target.value = "";
                  }}
                />

                <Button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  variant="outline"
                >
                  Upload file
                </Button>

                {field.value && field.value.length > 0 && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    {field.value.map((file: File, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={handleRemove}
                          className="text-red-500 ml-2 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
