import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Button } from "@/components/ui/button";

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
      <div className="flex  items-center flex-col gap-8">
        <h1 className="text-3xl">MY TODOs</h1>
        <div className="shadow-md p-4 flex flex-col gap-8">
          <TodoForm todo={todo} handleChange={handleChange} addTodo={addTodo} />
          <div className="h-1 text-red-400">
            {titleError && "Title cannot be empty"}
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setStatusView("active")}>To Do</Button>
            <Button onClick={() => setStatusView("complete")}>Completed</Button>
          </div>
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
    </>
  );
}

export default App;
