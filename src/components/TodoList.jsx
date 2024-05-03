import Todo from "./Todo";

const TodoList = ({ todoList, setTodoList, statusView }) => {
  function handleRemoveTask(id) {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todoItem) => todoItem.id !== id)
    );
  }

  function handleCompleteTask(id) {
    const todoListCopy = [...todoList];
    const index = todoListCopy.findIndex((item) => item.id === id);
    todoListCopy[index]["status"] = "complete";
    setTodoList(todoListCopy);
  }

  function editTodo(id, newContent) {
    const editedTodoList = todoList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, title: newContent };
      }
      return todo;
    });
    setTodoList(editedTodoList);
  }
  return (
    <ul className="flex flex-col  min-w-[70%] gap-4">
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <li key={todo.id} className="">
            <Todo
              id={todo.id}
              title={todo.title}
              content={todo.content}
              creationTime={todo.id}
              handleRemoveTask={handleRemoveTask}
              handleCompleteTask={handleCompleteTask}
              editTodo={editTodo}
              status={todo.status}
            />
          </li>
        ))
      ) : (
        <div>
          <h2 className="text-2xl ">{`You have no ${
            statusView === "complete" ? "completed" : "remaining"
          }${" "}todos`}</h2>
        </div>
      )}
    </ul>
  );
};

export default TodoList;
