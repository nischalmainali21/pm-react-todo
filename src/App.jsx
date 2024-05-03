import { useState } from "react";

import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListFilter } from "lucide-react";

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="flex gap-1 items-center"
                    variant="secondary"
                  >
                    <span>
                      <ListFilter />
                    </span>
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent></PopoverContent>
              </Popover>
            </div>
            {/* <div className="h-1 text-red-400">
              {titleError && "Title cannot be empty"}
            </div> */}
            {/* <div className="flex items-center gap-3">
              <Button onClick={() => setStatusView("active")}>To Do</Button>
              <Button onClick={() => setStatusView("complete")}>
                Completed
              </Button>
            </div> */}
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
