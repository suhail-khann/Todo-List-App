import React, { useState } from 'react';

function TodoItem({ 
  todo, 
  isEditing, 
  onStartEditing, 
  onFinishEditing, 
  onDeleteTodo, 
  onEditTodo,
  onToggleComplete 
}) {
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEditTodo(todo.id, { ...todo, text: editText });
      onFinishEditing();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="edit-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onFinishEditing}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
          </div>
          <div className="todo-actions">
            <button onClick={onStartEditing} disabled={todo.completed}>Edit</button>
            <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;