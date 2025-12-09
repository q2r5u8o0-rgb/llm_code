import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001/api';

  // Загрузить всех пользователей
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/users`);
      setUsers(response.data);
    } catch (err) {
      setError('Ошибка при загрузке пользователей. Убедись, что бэкенд запущен!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Добавить нового пользователя
  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post(`${API_BASE}/users`, newUser);
      setUsers([response.data, ...users]);
    } catch (err) {
      setError('Ошибка при создании пользователя');
      console.error(err);
    }
  };

  // Удалить пользователя
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_BASE}/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Ошибка при удалении пользователя');
      console.error(err);
    }
  };

  // Обновить пользователя
  const handleUpdateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`${API_BASE}/users/${id}`, updatedUser);
      setUsers(users.map(user => user.id === id ? response.data : user));
    } catch (err) {
      setError('Ошибка при обновлении пользователя');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>👨‍💻 Copilot Test Site</h1>
        <p>Управление пользователями с PostgreSQL</p>
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}

        <UserForm onAddUser={handleAddUser} />

        {loading && <div className="loading">Загрузка...</div>}

        <UserList
          users={users}
          onDelete={handleDeleteUser}
          onUpdate={handleUpdateUser}
        />
      </main>
    </div>
  );
}

export default App;
