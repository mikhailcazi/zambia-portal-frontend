// components/FormCheckboxGroupArrayField.tsx
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"; // adjust to your import
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

interface Props {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
}

export function FormCheckboxGroupArrayField({ name, label, options }: Props) {
  const { watch, setValue } = useFormContext();
  const selected: string[] = watch(name) || [];

  function toggleOption(value: string) {
    const newValues = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setValue(name, newValues);
  }

  return (
    <FormField
      name={name}
      render={() => (
        <FormItem className="space-y-2">
          {label && <Label className="font-medium">{label}</Label>}
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  checked={selected.includes(option.value)}
                  onCheckedChange={() => toggleOption(option.value)}
                />
                <Label style={{ fontWeight: "400" }}>{option.label}</Label>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
