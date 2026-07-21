import { useState } from "react";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Search } from "lucide-react";

export type FilterStatus = "pending" | "approved" | "rejected";

type FilterBarProps = {
  isAdmin: boolean;
  onStatusChange?: (status: FilterStatus) => void;
  onGlobalFilterChange: (value: string) => void;
};

export function FilterBar({
  isAdmin,
  onStatusChange,
  onGlobalFilterChange,
}: FilterBarProps) {
  const [status, setStatus] = useState<FilterStatus>("pending");
  const [globalFilter, setGlobalFilter] = useState("");

  const updateStatus = (value: string) => {
    const newStatus = value as FilterStatus;
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const updateGlobalFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
    onGlobalFilterChange(e.target.value);
  };

  return (
    <div className="flex items-end justify-between rounded-t-xl bg-[#eaf6f1] px-5 pt-4">
      {isAdmin && (
        <Tabs value={status} onValueChange={updateStatus}>
          <TabsList className="h-auto bg-transparent p-0 gap-2">
            <TabsTrigger
              value="pending"
              className="
            rounded-t-lg rounded-b-none
            border border-transparent
            px-5 py-3
            bg-transparent
            shadow-none
            data-[state=active]:bg-[#c5e6dc]
            data-[state=active]:border-[#c5e6dc]
            data-[state=active]:translate-y-px
            data-[state=active]:shadow-none
          "
            >
              Pending
            </TabsTrigger>

            <TabsTrigger
              value="approved"
              className="
            rounded-t-lg rounded-b-none
            border border-transparent
            px-5 py-3
            bg-transparent
            shadow-none
            data-[state=active]:bg-[#c5e6dc]
            data-[state=active]:border-[#c5e6dc]
            data-[state=active]:translate-y-px
            data-[state=active]:shadow-none
          "
            >
              Approved
            </TabsTrigger>

            <TabsTrigger
              value="rejected"
              className="
            rounded-t-lg rounded-b-none
            border border-transparent
            px-5 py-3
            bg-transparent
            shadow-none
            data-[state=active]:bg-[#c5e6dc]
            data-[state=active]:border-[#c5e6dc]
            data-[state=active]:translate-y-px
            data-[state=active]:shadow-none
          "
            >
              Rejected
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <div className="relative w-80 mb-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search proposals..."
          value={globalFilter}
          onChange={updateGlobalFilter}
          className="bg-white pl-9"
        />
      </div>
    </div>
  );
}
