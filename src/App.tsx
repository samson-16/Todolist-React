import { FaPen, FaClipboardList } from "react-icons/fa"
import { TodoList } from "./components/TodoList"
function App() {

  return (
      <div className="app">
        <div className="header">
          <div className="logoside">
            <FaPen/>
          </div>
          <div className="title">
            <h1>Todo List</h1>
            <FaClipboardList />
          </div>
        </div>
        <TodoList />
      </div>
  )
}

export default App
