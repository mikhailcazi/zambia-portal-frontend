import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type ProjectFilterProps = {
  field: string;
  values: string[];
  name: string;
};

export default function ProjectFilter({
  field,
  values,
  name,
}: ProjectFilterProps) {
  const [open, setOpen] = useState(true);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  return (
    <div className="w-full max-w-xs p-6 bg-white rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="mt-3 space-y-2">
          {values.map((value) => (
            <label
              key={value}
              className="flex justify-between items-center cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedValues.includes(value)}
                  onCheckedChange={() => toggleValue(value)}
                />
                <span className="text-sm text-gray-700">{value}</span>
              </div>
              {/* Replace 0 with your count */}
              {/* <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                0
              </span> */}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
