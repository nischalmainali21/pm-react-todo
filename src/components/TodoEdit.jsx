import { useState } from "react";
import DueDatePicker from "./DueDatePicker";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { PencilLine } from "lucide-react";

const TodoEdit = ({ id, orgTitle, orgContent, orgDueDate, editTodo }) => {
  console.log("🚀 ~ TodoEdit ~ orgDueDate:", orgDueDate);
  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState(orgDueDate === -1 ? null : orgDueDate);
  const [todo, setTodo] = useState({
    editedTodoTitle: orgTitle,
    editedTodoContent: orgContent,
  });

  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilLine className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[400px] " side="bottom" align="end">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              name="editedTodoTitle"
              id="editedTodoTitle"
              placeholder="Title"
              className=""
              value={todo.editedTodoTitle}
              onChange={(e) => handleChange(e)}
            />
            <Textarea
              type="text"
              name="editedTodoContent"
              id="editedTodoContent"
              placeholder="Notes"
              className=""
              value={todo.editedTodoContent}
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
                  editTodo(
                    id,
                    todo.editedTodoTitle,
                    todo.editedTodoContent,
                    dueDate
                  );
                  setOpen(false);
                }}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TodoEdit;
