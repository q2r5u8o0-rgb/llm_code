# Для пуша на GitHub нужен Personal Access Token

## Создание Personal Access Token

1. Перейди на https://github.com/settings/tokens/new
2. Заполни:
   - **Token name**: copilot-deploy
   - **Expiration**: 90 days
   - **Scopes**: Выбери только `repo` (полный доступ к приватным репозиториям)

3. Нажми **Generate token**
4. Скопируй сгенерированный token (он больше не будет видеть)

## Пуш кода с токеном

Выполни в терминале:

```bash
cd "/Users/sergeychuikin/Documents/web bot/copilot-test-site"
git remote remove origin
git remote add origin https://q2r5u8o0-rgb:YOUR_TOKEN@github.com/q2r5u8o0-rgb/llm_code.git
git push -u origin main
```

Замени `YOUR_TOKEN` на скопированный token.

---

После успешного пуша, переходим к деплою на Render и Vercel!
