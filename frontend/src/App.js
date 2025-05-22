import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SummaryButton from './components/SummaryButton';
import Notification from './components/Notification';
import { fetchTodos, addTodo, deleteTodo, editTodo, summarizeTodos } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        showNotification('Failed to load todos', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const handleAddTodo = async (text) => {
    setIsLoading(true);
    try {
      const newTodo = await addTodo({ text, completed: false });
      setTodos([...todos, newTodo]);
      showNotification('Todo added successfully', 'success');
    } catch (error) {
      showNotification('Failed to add todo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    setIsLoading(true);
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      showNotification('Todo deleted successfully', 'success');
    } catch (error) {
      showNotification('Failed to delete todo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTodo = async (id, updatedTodo) => {
    setIsLoading(true);
    try {
      const updated = await editTodo(id, updatedTodo);
      setTodos(todos.map(todo => todo.id === id ? updated : todo));
      showNotification('Todo updated successfully', 'success');
    } catch (error) {
      showNotification('Failed to update todo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      await handleEditTodo(id, { ...todoToUpdate, completed: !todoToUpdate.completed });
    }
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const pendingTodos = todos.filter(todo => !todo.completed);
      if (pendingTodos.length === 0) {
        showNotification('No pending todos to summarize', 'warning');
        setIsLoading(false);
        return;
      }
      
      const response = await summarizeTodos();
      showNotification('Summary sent to Slack successfully', 'success');
    } catch (error) {
      showNotification('Failed to send summary to Slack', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Todo Summary Assistant</h1>
      </header>
      <main>
        <TodoForm onAddTodo={handleAddTodo} />
        {notification.message && (
          <Notification message={notification.message} type={notification.type} />
        )}
        <TodoList 
          todos={todos} 
          onDeleteTodo={handleDeleteTodo} 
          onEditTodo={handleEditTodo} 
          onToggleComplete={handleToggleComplete}
        />
        <SummaryButton onSummarize={handleSummarize} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;