import { useState } from "react";

import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import TodoFilter from "./components/TodoFilter";

import { Separator } from "@/components/ui/separator";

export interface TodoType {
  id: number;
  title: string;
  content: string;
  status: "complete" | "active";
  completedOnTime: number | null;
  dueDate: Date | null;
}

export type TodoInputType = Pick<TodoType, "title" | "content">;

export type AddTodoFunction = (
  todoTitle: string,
  todoContent: string,
  todoStatus: "complete" | "active",
  completedOnTime: number | null,
  dueDate: Date | null
) => void;

export type StatusViewType = "all" | "complete" | "active";

function App() {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [todo, setTodo] = useState<TodoInputType>({
    title: "",
    content: "",
  });
  const [statusView, setStatusView] = useState<StatusViewType>("all");

  function addTodo(
    todoTitle: string,
    todoContent: string,
    todoStatus: "complete" | "active",
    completedOnTime: number | null = null,
    dueDate: Date | null = null
  ) {
    if (todoTitle.length < 1) {
      return;
    }

    const todo: TodoType = {
      id: Date.now(),
      title: todoTitle,
      content: todoContent,
      status: todoStatus as "complete" | "active",
      dueDate: dueDate,
      completedOnTime: completedOnTime,
    };

    setTodoList([...todoList, todo]);
    setTodo({ title: "", content: "" });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  const actualTodoList =
    statusView === "complete"
      ? todoList.filter((item) => item.status === "complete")
      : statusView === "active"
      ? todoList.filter((item) => item.status === "active")
      : todoList;

  if (statusView === "all") {
    actualTodoList.sort((a, b) => {
      if (a.status === "active" && b.status === "complete") {
        return -1; // "active" comes before "complete"
      } else if (a.status === "complete" && b.status === "active") {
        return 1; // "complete" comes after "active"
      } else {
        return 0; // no change in order
      }
    });
  }

  return (
    <>
      <div className="flex items-center flex-col pt-8 ">
        <div className="flex flex-col gap-6 min-w-[70%] ">
          <h1 className="text-3xl">To-Do</h1>
          <Separator />
          <div className=" flex flex-col gap-8">
            <div className="flex gap-4 items-center">
              <TodoAdd
                todo={todo}
                handleChange={handleChange}
                addTodo={addTodo}
              />
              <TodoFilter
                statusView={statusView}
                setStatusView={setStatusView}
              />
            </div>
            <TodoList
              todoList={actualTodoList}
              setTodoList={setTodoList}
              statusView={statusView}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
