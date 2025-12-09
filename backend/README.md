# Backend - PostgreSQL + Express

## Установка

1. Убедись, что PostgreSQL установлен и запущен
2. Создай базу данных:
   ```bash
   createdb copilot_db
   ```

3. Установи зависимости:
   ```bash
   npm install
   ```

4. Создай `.env` файл на основе `.env.example`:
   ```bash
   cp .env.example .env
   ```
   И отредактируй `DATABASE_URL` с твоими данными PostgreSQL

5. Инициализируй базу данных:
   ```bash
   node init-db.js
   ```

6. Запусти сервер:
   ```bash
   npm run dev
   ```

## API Endpoints

### Пользователи
- `GET /api/users` - Получить всех пользователей
- `GET /api/users/:id` - Получить пользователя по ID
- `POST /api/users` - Создать нового пользователя
- `PUT /api/users/:id` - Обновить пользователя
- `DELETE /api/users/:id` - Удалить пользователя

### Проекты
- `GET /api/users/:userId/projects` - Получить проекты пользователя
- `POST /api/projects` - Создать новый проект

### Health Check
- `GET /health` - Проверка статуса сервера
