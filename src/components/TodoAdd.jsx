import { useState } from "react";

import DueDatePicker from "./DueDatePicker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

const TodoAdd = ({ todo, handleChange, addTodo }) => {
  const [dueDate, setDueDate] = useState();
  const [open, setOpen] = useState(false);

  let actualDueDate = -1;
  if (dueDate) {
    actualDueDate = dueDate;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="flex gap-1 items-center">
          <span>
            <Plus />
          </span>
          <span>New To-Do</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[400px] " side="bottom" align="start">
        <div className="flex flex-col gap-8">
          {/* <h3 className="text-xl">Create a new To-Do</h3> */}
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              name="todoTitle"
              id="todoTitle"
              placeholder="Title"
              className=""
              value={todo.todoTitle}
              onChange={(e) => handleChange(e)}
            />
            <Textarea
              type="text"
              name="todoContent"
              id="todoContent"
              placeholder="Notes"
              className=""
              value={todo.todoContent}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <DueDatePicker dueDate={dueDate} setDueDate={setDueDate} />
            </div>
            <div className="">
              <Button
                onClick={() => {
                  addTodo(
                    todo.todoTitle,
                    todo.todoContent,
                    "active",
                    -1,
                    actualDueDate
                  );
                  setDueDate();
                  setOpen(false);
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TodoAdd;
