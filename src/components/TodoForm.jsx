import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TodoForm = ({ todo, handleChange, addTodo }) => {
  return (
    <div className="flex gap-8">
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <label htmlFor="todoTitle">Title</label>
          <Input
            type="text"
            name="todoTitle"
            id="todoTitle"
            placeholder="What to do"
            value={todo.todoTitle}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="todoContent">Description</label>
          <Input
            type="text"
            name="todoContent"
            id="todoContent"
            placeholder="Describe the task"
            value={todo.todoContent}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div>
        <Button
          onClick={() => addTodo(todo.todoTitle, todo.todoContent, "active")}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TodoForm;
