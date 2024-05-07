import { useState } from "react";

import { StatusViewType } from "../App";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ListFilter } from "lucide-react";

import { Check } from "lucide-react";

type FilterOptionType =
  | { value: "active"; label: "Active" }
  | { value: "complete"; label: "Complete" }
  | { value: "all"; label: "All" };

const FILTEROPTIONS: FilterOptionType[] = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "complete",
    label: "Complete",
  },
  {
    value: "all",
    label: "All",
  },
];

interface TodoFilterProps {
  statusView: StatusViewType;
  setStatusView: React.Dispatch<React.SetStateAction<StatusViewType>>;
}

const TodoFilter = ({ statusView, setStatusView }: TodoFilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="flex gap-1 items-center" variant="secondary">
          <span>
            <ListFilter />
          </span>
          <span>
            {statusView
              ? FILTEROPTIONS.find(
                  (filterItem) => filterItem.value === statusView
                )?.label
              : "Filters"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search Filter..." />
          <CommandEmpty>No Filter Found.</CommandEmpty>
          <CommandGroup>
            {FILTEROPTIONS.map((filterItem) => (
              <CommandItem
                key={filterItem.value}
                value={filterItem.value}
                onSelect={(currentValue: StatusViewType) => {
                  // if it is empty or any other value, set the selected value
                  // if the selected value is already selected, reset the value state
                  setStatusView(
                    currentValue === statusView ? "all" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    statusView === filterItem.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {filterItem.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TodoFilter;
