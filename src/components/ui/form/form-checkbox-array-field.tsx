// components/FormCheckboxGroupArrayField.tsx
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"; // adjust to your import
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
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
  const { watch, setValue } = useFormContext();
  // const selected: string[] = watch(name) || [];

  const [otherText, setOtherText] = useState("");
  const displayOptions = otherOption ? options.concat(["Other"]) : options;

  // const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const textVal = e.target.value;
  //   setOtherText(textVal);
  // };

  // function toggleOption(value: string) {
  //   const newValues = selected.includes(value)
  //     ? selected.filter((v) => v !== value)
  //     : [...selected, value];
  //   setValue(name, newValues);
  // }

  const handleChange = (
    field: ControllerRenderProps<FieldValues, string>,
    option: string
  ) => {
    const newValues = (field.value || []).includes(option)
      ? (field.value || []).filter((v: string) => v !== option)
      : [...(field.value || []), option];
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
                {/* {option === "Other" && selected.includes(option) && (
                  <Input
                    placeholder="Please specify"
                    value={otherText}
                    onChange={handleOtherTextChange}
                  ></Input>
                )} */}
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
