# Dev-Chat

Простой веб-чат, построенный с использованием **Next.js**, **Firebase Authentication** и **Cloud Firestore**.

## Инструкция запуска

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Настройте переменные окружения:
   Копируйте `.env.example` в `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Откройте `.env.local` и заполните значениями конфигурации вашего проекта Firebase.

3. Запустите сервер для разработки:
   ```bash
   npm run dev
   ```

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Деплой

### 1. Правила безопасности Firestore
Правила безопасности для базы данных описаны в файле `firestore.rules`. При деплое в продакшн опубликуйте содержимое этого файла вручную через **Firebase Console** в разделе **Firestore Database -> Rules**.

### 2. Авторизованные домены
Для работы аутентификации на продакшн-домене (например, при деплое на Vercel), не забудьте добавить адрес вашего сайта в панели управления Firebase: **Authentication -> Settings -> Authorized domains**.
