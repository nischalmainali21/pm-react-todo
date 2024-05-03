import EditableText from "./EditableText";

import { cn } from "@/lib/utils";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Trash2 } from "lucide-react";

const MonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Todo = ({
  id,
  title,
  content,
  creationTime,
  handleRemoveTask,
  handleCompleteTask,
  editTodo,
  status,
}) => {
  const dateCreated = new Date(creationTime);
  const day = dateCreated.getDate();
  const monthNumber = dateCreated.getMonth();
  const year = dateCreated.getFullYear();
  const actualDate = `${String(day)} ${MonthNames[monthNumber]} ${year}`;

  function handleChange(e, id) {
    // editTodo(id, e.target.textContent);
    editTodo(id, e.target.value);
  }

  return (
    <Card
      className={cn(
        status === "complete" ? "bg-muted text-muted-foreground" : ""
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <div className="p-3">
            {/* TODO: handle changing completed todo from complete state to active state */}
            <Checkbox
              className="w-5 h-5"
              onCheckedChange={() => handleCompleteTask(id)}
              checked={status !== "active"}
            />
          </div>
          <CardHeader className="p-3">
            <CardTitle
              // contentEditable="true"
              // onInput={(e) => handleChange(e, id)}
              className={cn("p-2 pl-0")}
            >
              <EditableText text={title}>
                <Input
                  type="text"
                  name="todo"
                  value={title}
                  onChange={(e) => handleChange(e, id)}
                  className="h-8 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                />
              </EditableText>
              {/* {title} */}
            </CardTitle>
            <CardDescription>
              <span className="flex gap-1 items-center text-center text-xs">
                <span className=" opacity-70 ">{actualDate}</span>
                <span>{content && content}</span>
              </span>
            </CardDescription>
          </CardHeader>
        </div>
        <div className="flex items-center gap-3 pr-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveTask(id)}
            className="group"
          >
            <Trash2 className="w-4 h-4 group-hover:text-red-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Todo;
