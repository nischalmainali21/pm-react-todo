import Todo from "./Todo";
import { TodoType, StatusViewType } from "@/App";

interface TodoListProps {
  todoList: TodoType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoType[]>>;
  statusView: StatusViewType;
}

type IdType = Pick<TodoType, "id">;

const TodoList = ({ todoList, setTodoList, statusView }: TodoListProps) => {
  function handleRemoveTask(id: number) {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todoItem) => todoItem.id !== id)
    );
  }

  function handleCompleteTask(id: number) {
    const todoListCopy = [...todoList];
    const index = todoListCopy.findIndex((item) => item.id === id);
    if (todoListCopy[index]["status"] === "complete") {
      todoListCopy[index]["status"] = "active";
      todoListCopy[index]["completedOnTime"] = null;
    } else {
      todoListCopy[index]["status"] = "complete";
      todoListCopy[index]["completedOnTime"] = Date.now();
    }
    setTodoList(todoListCopy);
  }

  function editTodoTitle(id: number, newTitle: string) {
    const editedTodoList = todoList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    setTodoList(editedTodoList);
  }

  function editTodo(
    id: number,
    newTitle: string,
    newContent: string,
    newDueDate: Date
  ) {
    //title cannot be empty
    if (newTitle.length < 1) {
      return;
    }
    const editedTodoList = todoList.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          title: newTitle,
          content: newContent,
          dueDate: newDueDate,
        };
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
              handleRemoveTask={handleRemoveTask}
              handleCompleteTask={handleCompleteTask}
              editTodoTitle={editTodoTitle}
              status={todo.status}
              completedOnTime={todo.completedOnTime}
              dueDate={todo.dueDate}
              editTodo={editTodo}
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
