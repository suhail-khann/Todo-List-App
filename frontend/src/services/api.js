const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const addTodo = async (todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const editTodo = async (id, updatedTodo) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  
  return true;
};

export const summarizeTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/summarize`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to summarize todos');
  }
  
  return response.json();
};