import { useState } from "react";

import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import TodoFilter from "./components/TodoFilter";

import { Separator } from "@/components/ui/separator";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({ todoTitle: "", todoContent: "" });
  const [statusView, setStatusView] = useState("all");

  function addTodo(
    todoTitle,
    todoContent,
    todoStatus,
    completedOnTime = -1,
    dueDate = -1
  ) {
    if (todoTitle.length < 1) {
      return;
    }
    const todo = {
      id: Date.now(),
      title: todoTitle,
      content: todoContent,
      status: todoStatus,
      dueDate: dueDate,
      completedOnTime: completedOnTime,
    };

    setTodoList((prevTodos) => [...prevTodos, todo]);
    setTodo({ todoTitle: "", todoContent: "" });
  }

  function handleChange(e) {
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
