import { useState } from "react";

import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";

import { Separator } from "@/components/ui/separator";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({ todoTitle: "", todoContent: "" });
  const [statusView, setStatusView] = useState("active");
  const [titleError, setTitleError] = useState(false);

  function addTodo(todoTitle, todoContent, todoStatus) {
    if (todoTitle.length < 1) {
      setTitleError(true);
      return;
    }
    const todo = {
      id: Date.now(),
      title: todoTitle,
      content: todoContent,
      status: todoStatus,
    };

    setTodoList((prevTodos) => [...prevTodos, todo]);
    setTitleError(false);
    setTodo({ todoTitle: "", todoContent: "" });
  }

  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="flex items-center flex-col pt-8 ">
        <div className="flex flex-col gap-6 min-w-[70%]">
          <h1 className="text-3xl">To-Do</h1>
          <Separator />
          <div className=" flex flex-col gap-8">
            <div className="flex gap-2 items-center">
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
            {/* TODO: calculate the data to provide as a varaible to remove conditional rendering of same component */}
            {statusView === "complete" ? (
              <TodoList
                todoList={todoList.filter((item) => item.status === "complete")}
                setTodoList={setTodoList}
                statusView={statusView}
              />
            ) : (
              <TodoList
                todoList={todoList.filter((item) => item.status === "active")}
                setTodoList={setTodoList}
                statusView={statusView}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
