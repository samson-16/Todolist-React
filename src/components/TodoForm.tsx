import { useState } from "react";
import type { TodoTypes } from "../todo";
import TodoService from "../TodoService";

interface propTypes {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}
const TodoForm = ({ setTodos }: propTypes) => {

    const [newTodoText, setNewTodoText] = useState<string>("");
    const handleAddTodo = () => {
        if (newTodoText.trim() !== "") {
            const newTodo = TodoService.addTodos(newTodoText);
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setNewTodoText("");
        }
    }
  return (
    <div className="inputForm">
        <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo"
            autoFocus={true}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  )
}

export default TodoForm