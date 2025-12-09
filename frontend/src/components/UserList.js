import React, { useState } from 'react';
import './UserList.css';

function UserList({ users, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSaveEdit = (id) => {
    onUpdate(id, editData);
    setEditingId(null);
  };

  const handleStartEdit = (user) => {
    setEditingId(user.id);
    setEditData({
      name: user.name,
      email: user.email,
      age: user.age,
    });
  };

  if (users.length === 0) {
    return (
      <div className="no-users">
        <p>Пока нет пользователей. Добавь первого!</p>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>Список пользователей ({users.length})</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            {editingId === user.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  placeholder="Имя"
                />
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                />
                <input
                  type="number"
                  name="age"
                  value={editData.age || ''}
                  onChange={handleEditChange}
                  placeholder="Возраст"
                />
                <div className="edit-buttons">
                  <button
                    className="save-btn"
                    onClick={() => handleSaveEdit(user.id)}
                  >
                    Сохранить
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditingId(null)}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  {user.age && (
                    <p>
                      <strong>Возраст:</strong> {user.age}
                    </p>
                  )}
                  <p className="date">
                    <strong>Дата создания:</strong>{' '}
                    {new Date(user.created_at).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className="user-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleStartEdit(user)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(user.id)}
                  >
                    Удалить
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
