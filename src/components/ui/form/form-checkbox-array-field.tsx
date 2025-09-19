// components/FormCheckboxGroupArrayField.tsx
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"; // adjust to your import
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../input";
import { useState } from "react";

interface Props {
  name: string;
  label?: string;
  options: string[];
  otherOption?: boolean;
}

export function FormCheckboxGroupArrayField({
  name,
  label,
  options,
  otherOption,
}: Props) {
  const [otherSelected, setOtherSelected] = useState(false);
  const displayOptions = otherOption ? options.concat(["Other"]) : options;

  const handleChange = (
    field: ControllerRenderProps<FieldValues, string>,
    option: string
  ) => {
    const newValues = (field.value || []).includes(option)
      ? (field.value || []).filter((v: string) => v !== option)
      : [...(field.value || []), option];

    setOtherSelected(newValues.includes("Other"));

    field.onChange(newValues);
  };

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {label && <Label className="font-medium">{label}</Label>}
          <div className="grid grid-cols-2 gap-2">
            {displayOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  checked={(field.value || []).includes(option)}
                  onCheckedChange={() => {
                    handleChange(field, option);
                  }}
                />
                <Label style={{ fontWeight: "400" }}>{option}</Label>
              </div>
            ))}
          </div>
          {otherSelected && (
            <FormField
              name={name + "Other"}
              render={({ field }) => (
                <FormItem>
                  <Label style={{ fontWeight: "400" }}>
                    Other, please specify:{" "}
                  </Label>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
