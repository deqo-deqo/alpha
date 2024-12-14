const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(path.join(__dirname)));

// Маршрутизация для SPA
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
}); 