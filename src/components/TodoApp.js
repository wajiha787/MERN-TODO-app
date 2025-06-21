import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoApp = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setTodos(res.data);
    } catch {
      setError("Error fetching todos.");
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/todos",
        { task },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTodos([...todos, res.data]);
      setTask("");
    } catch {
      setError("Error adding todo.");
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/todos/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch {
      setError("Error updating todo.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch {
      setError("Error deleting todo.");
    }
  };

  return (
    <div className="todo-app">
      <h2>Your Todos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="todo-input">
        <input
          type="text"
          value={task}
          placeholder="Add a new task..."
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
              />
              <span className={todo.completed ? "completed" : ""}>{todo.task}</span>
            </div>
            <button onClick={() => deleteTodo(todo._id)} style={{ color: 'red', border: 'none', background: 'none' }}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
