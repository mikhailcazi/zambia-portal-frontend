import { useRef } from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { FormSchema } from "@/lib/schema/formSchema";

type FormValues = z.infer<typeof FormSchema>;

type FormFileUploadFieldProps = {
  name: "attachments" | "projectOverview";
  form: UseFormReturn<FormValues>;
  label: string;
  description?: string;
  multiple?: boolean;
};

export function FormFileUploadField({
  name,
  form,
  label,
  description,
}: FormFileUploadFieldProps) {
  const { field } = useController({ name, control: form.control });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleRemove = (indexToRemove: number) => {
    const newFiles = (field.value || []).filter((_, i) => i !== indexToRemove);
    form.setValue(name, newFiles);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      {description && (
        <FormDescription className="whitespace-pre-line">
          {description}
        </FormDescription>
      )}
      <FormControl>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              const newFiles = e.target.files;
              if (!newFiles || newFiles.length === 0) return;

              const existingFiles: File[] = field.value || [];
              const fileToAdd = newFiles[0];

              const alreadyExists = existingFiles.some(
                (file) =>
                  file.name === fileToAdd.name && file.size === fileToAdd.size
              );

              if (!alreadyExists) {
                form.setValue(name, [...existingFiles, fileToAdd]);
              }

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
                <div key={index} className="flex items-center justify-between">
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
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
}
