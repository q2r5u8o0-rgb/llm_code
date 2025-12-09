# 🚀 Деплой Copilot Test Site

## Вариант 1: Деплой на Render.com (Бэкенд) + Vercel (Фронтенд)

### Шаг 1: Подготовка GitHub репозитория

```bash
# Инициализируй git репозиторий
cd /path/to/copilot-test-site
git init
git add .
git commit -m "Initial commit"

# Создай репозиторий на GitHub (https://github.com/new)
git remote add origin https://github.com/YOUR_USERNAME/copilot-test-site.git
git branch -M main
git push -u origin main
```

### Шаг 2: Деплой Бэкенда на Render.com

1. Перейди на https://render.com (регистрация через GitHub)
2. Нажми **New +** → **Web Service**
3. Выбери твой GitHub репозиторий
4. Заполни данные:
   - **Name**: copilot-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `cd backend && npm start`
   - **Region**: Frankfurt (или ближайший к тебе)

5. В разделе **Environment** добавь переменные:
   ```
   DATABASE_URL=postgresql://user:password@your-db-host:5432/db_name
   NODE_ENV=production
   PORT=3001
   ```

6. Для PostgreSQL:
   - На Render выбери **Databases** → **New PostgreSQL**
   - Скопируй `Internal Database URL` в переменную `DATABASE_URL`

7. Нажми **Create Web Service**

После деплоя получишь URL вроде: `https://copilot-backend.onrender.com`

### Шаг 3: Обнови фронтенд с URL бэкенда

```bash
# В корне frontend создай или обнови .env.production
REACT_APP_API_BASE=https://copilot-backend.onrender.com/api
```

### Шаг 4: Деплой Фронтенда на Vercel

1. Перейди на https://vercel.com (регистрация через GitHub)
2. Нажми **New Project**
3. Импортируй твой GitHub репозиторий
4. В **Root Directory** выбери: `frontend`
5. В **Environment Variables** добавь:
   ```
   REACT_APP_API_BASE=https://copilot-backend.onrender.com/api
   ```
6. Нажми **Deploy**

После деплоя получишь URL вроде: `https://copilot-test-site.vercel.app`

---

## Вариант 2: Деплой на Railway.app (проще, всё в одном месте)

### Шаг 1: Регистрация
Перейди на https://railway.app (регистрация через GitHub)

### Шаг 2: Создание проекта
1. Нажми **New Project** → **Deploy from GitHub repo**
2. Выбери твой репозиторий
3. Railway автоматически обнаружит backend и frontend

### Шаг 3: Настройка сервисов
Railway автоматически создаст 2 сервиса. Для каждого:

**Backend Service:**
- **Root Directory**: `backend`
- **Start Command**: `npm start`
- Добавь PostgreSQL базу (Railway предложит автоматически)

**Frontend Service:**
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Start Command**: `serve -s build -l 3000`

### Шаг 4: Переменные окружения
Railway автоматически установит `DATABASE_URL`. Для фронтенда добавь:
```
REACT_APP_API_BASE=https://backend-service-url/api
```

---

## Вариант 3: Деплой на Heroku (требует карты, но самый простой)

### Шаг 1: Установка Heroku CLI
```bash
brew install heroku/brew/heroku
heroku login
```

### Шаг 2: Деплой бэкенда
```bash
cd backend
heroku create copilot-backend
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Шаг 3: Деплой фронтенда
```bash
cd ../frontend
heroku create copilot-frontend
npm run build
git push heroku main
```

---

## Краткий гайд: Какой выбрать?

| Сервис | Стоимость | Сложность | БД | Рекомендация |
|--------|-----------|-----------|----|----|
| **Render + Vercel** | Бесплатно | Средняя | Включена | ⭐ Лучший выбор |
| **Railway** | $5/месяц | Простая | Включена | Хороший выбор |
| **Heroku** | $7/месяц | Простая | Платная | Если есть карта |

---

## Проверка после деплоя

```bash
# Проверить бэкенд
curl https://your-backend-url/health

# Проверить фронтенд
# Открыть в браузере: https://your-frontend-url
```

---

## Полезные команды для обновления

```bash
# Если сделал изменения локально
git add .
git commit -m "Update something"
git push origin main
# Сервисы автоматически перепубликуются!
```

---

## Проблемы и решения

### CORS ошибка
Убедись что в `backend/server.js` включен CORS:
```javascript
app.use(cors());
```

### БД не подключается
Проверь `DATABASE_URL` в переменных окружения на хостинге

### Фронтенд не видит бэкенд
Убедись что `REACT_APP_API_BASE` правильный и содержит `https://`, не `http://`

---

Дай мне знать какой вариант выбираешь, и я помогу с остальными шагами! 🚀
