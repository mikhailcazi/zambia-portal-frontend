"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";

export function DatePicker({ name, label }: { name: string; label: string }) {
  const [open, setOpen] = React.useState(false);
  // const [date, setDate] = React.useState<Date | undefined>(undefined);

  const { setValue, watch } = useFormContext();
  const value = watch(name);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1 font-normal">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal border-neutral-200"
          >
            {value ? value.toLocaleDateString("en-GB") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            // onSelect={(date) => setValue(name, date)}
            // selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setValue(name, date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
