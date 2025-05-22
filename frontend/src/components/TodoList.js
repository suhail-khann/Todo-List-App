import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDeleteTodo, onEditTodo, onToggleComplete }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="todo-list">
      <h2>My Todos</h2>
      {todos.length === 0 ? (
        <p className="empty-message">No todos yet. Add one to get started!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              onStartEditing={() => setEditingId(todo.id)}
              onFinishEditing={() => setEditingId(null)}
              onDeleteTodo={onDeleteTodo}
              onEditTodo={onEditTodo}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;