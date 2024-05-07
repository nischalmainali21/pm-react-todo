import { useState } from "react";

import DueDatePicker from "./DueDatePicker";
import { TodoInputType, AddTodoFunction } from "@/App";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

interface TodoAddProps {
  todo: TodoInputType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodo: AddTodoFunction;
}

const TodoAdd = ({ todo, handleChange, addTodo }: TodoAddProps) => {
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [emptyTitleError, setEmptyTitleError] = useState(false);

  let actualDueDate = null;
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
              name="title"
              id="title"
              placeholder="Title"
              className=""
              value={todo.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
            <div>
              {emptyTitleError && (
                <span className="text-red-500">Title cannot be empty.</span>
              )}
            </div>
            <Textarea
              type="text"
              name="content"
              id="content"
              placeholder="Notes"
              className=""
              value={todo.content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <DueDatePicker dueDate={dueDate} setDueDate={setDueDate} />
            </div>
            <div className="">
              <Button
                onClick={() => {
                  if (todo.title.length < 1) {
                    setEmptyTitleError(true);
                    return;
                  }
                  addTodo(
                    todo.title,
                    todo.content,
                    "active",
                    null,
                    actualDueDate
                  );
                  setDueDate(null);
                  setEmptyTitleError(false);
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
