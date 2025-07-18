import { useState } from "react"
import type { TodoTypes } from "../todo"
import TodoService from "../TodoService"
import { FaCheck, FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin3Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";

interface TodoListProps {
  listClassName?: string;
  itemClassName?: string;
  checkboxClassName?: string;
  deleteButtonClassName?: string;
}

export const TodoList = () => {
    const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [editiingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editedTodoText, setEditedTodoText] = useState<string>("");

    const handleEditStart = (id: number, text: string) => {
        setEditingTodoId(id);
        setEditedTodoText(text);
    }

    const handleEditCancel = () => {
        setEditingTodoId(null);
        setEditedTodoText("");
    }
    const handleEditSave = (id: number) => {
        if (editedTodoText.trim() !== "") {
            const updatedTodo = { id, text: editedTodoText, completed: false };
            TodoService.updateTodo(updatedTodo);
            setTodos((prevTodos)=>
                prevTodos.map(todo => todo.id === id ? updatedTodo : todo))
        handleEditCancel()
    }
}

//!function to delete a todo
const handleDelete = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
}

  return (
    <div className="todoContainer">
        <TodoForm setTodos={setTodos}  />
        {todos.map((todo) => (
            <div key={todo.id} className="items">
                {editiingTodoId === todo.id ? (
                    <div className="editedText">
                        <input
                            type="text"
                            value={editedTodoText}
                            onChange={(e) => setEditedTodoText(e.target.value)}
                            autoFocus={true}
                        />
                        <button onClick={() => handleEditSave(todo.id)}>
                            <FaCheck />
                        </button>
                         <button className="cancelBtn" onClick={() => handleEditCancel()}>
                            <GiCancel />
                        </button>
                    </div>
            
                ):(
                    <div className="editBtn">
                        <span>{todo.text}</span>
                        <button onClick={() => handleEditStart(todo.id, todo.text)}>
                            <FaEdit />
                        </button>
                    </div>
                )}
   <button onClick={() => handleDelete(todo.id)} className="deleteBtn">
        <RiDeleteBin3Fill />
    </button>
                 </div>
            ))
            }

 
             
    </div>
  )
}

export default TodoList