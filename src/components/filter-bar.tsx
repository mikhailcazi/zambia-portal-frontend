import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export type FilterPair = { [key: string]: boolean | string };
type FilterBarProps = {
  isAdmin: boolean;
  onFilterChange?: (value: FilterPair) => void;
  onGlobalFilterChange: (value: string) => void;
};
export const DEFAULT_FILTERS = { approved: false, rejected: false };

export function FilterBar({
  isAdmin,
  onFilterChange,
  onGlobalFilterChange,
}: FilterBarProps) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [globalFilter, setGlobalFilter] = useState("");

  const updateFilters = (filterChanges: FilterPair) => {
    const newFilters = { ...filters, ...filterChanges };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const updateGlobalFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e!.target.value);
    onGlobalFilterChange(e.target.value);
  };

  return (
    <div className="bg-[#c5e6dc] p-4">
      {isAdmin && (
        <div className="flex items-center gap-4 mb-4">
          <Label className="flex items-center gap-2">
            <Switch
              checked={filters.approved}
              onCheckedChange={(checked) =>
                updateFilters({ approved: !!checked })
              }
              className="data-[state=unchecked]:bg-[#b5bcb3] data-[state=checked]:bg-[#4e6e54]"
            />
            <span>Show Approved</span>
          </Label>

          <Label className="flex items-center gap-2">
            <Switch
              checked={filters.rejected}
              onCheckedChange={(checked) =>
                updateFilters({ rejected: !!checked })
              }
              className="data-[state=unchecked]:bg-[#b5bcb3] data-[state=checked]:bg-[#4e6e54]"
            />
            <span>Show Rejected</span>
          </Label>
        </div>
      )}

      <div className="">
        <Input
          placeholder="Type here to filter results..."
          value={globalFilter}
          onChange={updateGlobalFilter}
          className="max-w-sm bg-white"
        />
      </div>
    </div>
  );
}
