import React, { useState } from 'react';
import './UserForm.css';

function UserForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Пожалуйста, заполни обязательные поля');
      return;
    }

    onAddUser({
      name: formData.name,
      email: formData.email,
      age: formData.age ? parseInt(formData.age) : null,
    });

    setFormData({
      name: '',
      email: '',
      age: '',
    });
  };

  return (
    <div className="user-form-container">
      <h2>Добавить нового пользователя</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Возраст (опционально)"
          value={formData.age}
          onChange={handleChange}
        />
        <button type="submit">Добавить пользователя</button>
      </form>
    </div>
  );
}

export default UserForm;
