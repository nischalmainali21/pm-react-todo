import EditableText from "./EditableText";
import TodoEdit from "./TodoEdit";
import { TodoType } from "@/App";

import { cn, formatMillisecondsToDate, getDateString } from "@/lib/utils";

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

interface TodoProps {
  id: TodoType["id"];
  title: TodoType["title"];
  content: TodoType["content"];
  status: TodoType["status"];
  completedOnTime: TodoType["completedOnTime"];
  dueDate: TodoType["dueDate"];
  handleRemoveTask: (id: TodoType["id"]) => void;
  handleCompleteTask: (id: TodoType["id"]) => void;
  editTodoTitle: (id: TodoType["id"], newTitle: TodoType["title"]) => void;
  editTodo: (
    id: TodoType["id"],
    newTitle: TodoType["title"],
    newContent: TodoType["content"],
    newDueDate: TodoType["dueDate"]
  ) => void;
}

const Todo = ({
  id,
  title,
  content,
  handleRemoveTask,
  handleCompleteTask,
  editTodoTitle,
  status,
  completedOnTime,
  dueDate,
  editTodo,
}: TodoProps) => {
  let actualCompletedDate;
  let dueDateColor;
  if (status === "complete") {
    actualCompletedDate = formatMillisecondsToDate(completedOnTime);
  }

  const dateString = dueDate && getDateString(dueDate);
  if (status !== "complete" && dueDate !== null) {
    dueDateColor =
      dateString?.toLowerCase() === "today"
        ? "text-orange-600"
        : dateString?.toLowerCase() === "tomorrow"
        ? "text-yellow-600"
        : dateString?.toLowerCase() === "yesterday"
        ? "text-red-600"
        : "";
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: TodoType["id"]
  ) {
    // editTodo(id, e.target.textContent);
    editTodoTitle(id, e.target.value);
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, id)
                  }
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
            {dueDate !== null && (
              <CardDescription
                className={cn("text-sm flex items-center gap-1", dueDateColor)}
              >
                test
                <CalendarIcon className="h-4 w-4" />
                <span>{dateString}</span>
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
          <TodoEdit
            id={id}
            orgTitle={title}
            orgContent={content}
            orgDueDate={dueDate}
            editTodo={editTodo}
          />
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
