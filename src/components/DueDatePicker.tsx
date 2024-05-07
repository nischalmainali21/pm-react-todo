import { useState } from "react";
import { DueDateType } from "./TodoAdd";

import { cn, getDateString } from "../lib/utils";

import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface DueDatePickerProps {
  dueDate: DueDateType;
  setDueDate: React.Dispatch<React.SetStateAction<DueDateType>>;
}

const DueDatePicker = ({ dueDate, setDueDate }: DueDatePickerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " text-left font-normal",
            !dueDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dueDate ? getDateString(dueDate) : <span>Due Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={(date: DueDateType) => {
            setOpen(false);
            setDueDate(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DueDatePicker;
