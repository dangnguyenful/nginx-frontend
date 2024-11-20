import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('/api').then(response => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    axios.post('/api', { title: newTodo, completed: false })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      });
  };

  const toggleCompletion = id => {
    const todo = todos.find(todo => todo.id === id);
    axios.put(`/api/${id}`, { ...todo, completed: !todo.completed })
      .then(response => {
        setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      });
  };

  const deleteTodo = id => {
    axios.delete(`/api/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
