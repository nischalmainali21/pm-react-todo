import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

const FILTEROPTIONS = [
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

const TodoFilter = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="flex gap-1 items-center" variant="secondary">
          <span>
            <ListFilter />
          </span>
          <span>Filters</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent></PopoverContent>
    </Popover>
  );
};

export default TodoFilter;
