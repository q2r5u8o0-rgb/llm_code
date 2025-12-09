import pool from './db.js';

export async function initializeDatabase() {
  try {
    // Создаём таблицу для пользователей
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Создаём таблицу для задач/проектов
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ База данных инициализирована успешно!');
    return;
  } catch (err) {
    console.error('❌ Ошибка при инициализации БД:', err);
    throw err;
  }
}

// If run as a script directly (not imported)
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].endsWith('init-db.js')) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
