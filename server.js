const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Базовая защита
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Ограничение размера запроса
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Статические файлы
app.use(express.static(path.join(__dirname)));

// Маршрутизация для SPA
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
}); 