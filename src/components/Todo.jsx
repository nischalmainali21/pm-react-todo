import EditableText from "./EditableText";

import { cn, formatMillisecondsToDate } from "@/lib/utils";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Trash2, Calendar as CalendarIcon } from "lucide-react";

const Todo = ({
  id,
  title,
  content,
  handleRemoveTask,
  handleCompleteTask,
  editTodo,
  status,
  completedOnTime,
  dueDate,
}) => {
  let actualCompletedDate;
  let dueDateColor;
  if (status === "complete") {
    actualCompletedDate = formatMillisecondsToDate(completedOnTime);
  }
  if (status !== "complete" && dueDate !== -1) {
    dueDateColor =
      dueDate?.toLowerCase() === "today"
        ? "text-orange-600"
        : dueDate?.toLowerCase() === "tomorrow"
        ? "text-yellow-600"
        : dueDate?.toLowerCase() === "yesterday"
        ? "text-red-600"
        : "";
  }

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
          <CardHeader className="p-1 flex flex-col space-y-0">
            <CardTitle
              // contentEditable="true"
              // onInput={(e) => handleChange(e, id)}
              className={cn(
                "p-2 pl-0",
                status === "complete" ? "font-medium" : ""
              )}
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

            {/* notes */}
            {content && (
              <CardDescription className="text-sm">
                <span>{content}</span>
              </CardDescription>
            )}

            {/* due date */}
            {dueDate !== -1 && (
              <CardDescription
                className={cn("text-sm flex items-center gap-1", dueDateColor)}
              >
                <CalendarIcon className="h-4 w-4" />
                <span>{dueDate}</span>
              </CardDescription>
            )}

            {/* completed time */}
            {status === "complete" && (
              <CardDescription className="text-xs">
                <span className="opacity-70">
                  Completed: {actualCompletedDate}
                </span>
              </CardDescription>
            )}
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
