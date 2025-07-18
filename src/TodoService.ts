import type { TodoTypes } from "./todo";


const Local_Storage_Key = "todo"

const TodoService = {
    //get todos
    getTodos: (): TodoTypes[] => {
        const todos = localStorage.getItem(Local_Storage_Key);
        
        return todos ? JSON.parse(todos) : [];
    },
    addTodos: (text: string): TodoTypes => {
        const todos = TodoService.getTodos();
        const newTodo: TodoTypes = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            text,   
            completed: false
        };
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem(Local_Storage_Key, JSON.stringify(updatedTodos));
        return newTodo;
    },

    updateTodo: (todo: TodoTypes): TodoTypes => {
        const todos = TodoService.getTodos();
        const updatedTodos = todos.map(t => (t.id === todo.id ? todo : t));
        localStorage.setItem(Local_Storage_Key, JSON.stringify(updatedTodos));
        return todo;
    },
   
    deleteTodo: (id: number): void => {
        const todos = TodoService.getTodos();
        const updatedTodos = todos.filter(t => t.id !== id);
        localStorage.setItem(Local_Storage_Key, JSON.stringify(updatedTodos));

    },
}

export default TodoService;