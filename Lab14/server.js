// Додаткове завдання. Grebenuk, 305-ТН, №07.
'use strict';
const express = require('express');
const path = require('node:path');
const app = express();

// Нормалізація адрес зберігає коректність відносних посилань на CSS.
app.use((req, res, next) => {
  if (['/task1/', '/task2/', '/task1.html/', '/task2.html/', '/index.html/'].includes(req.path)) {
    return res.redirect(301, req.path.slice(0, -1));
  }
  next();
});
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get(['/task1', '/task1.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'task1.html'));
});
app.get(['/task2', '/task2.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'task2.html'));
});
app.use((req, res) => {
  res.status(404).type('text/plain').send('Сторінку не знайдено');
});

if (require.main === module) {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Лабораторна №14: http://localhost:${server.address().port}`);
  });
  server.on('error', (error) => { console.error(error.message); process.exitCode = 1; });
}
module.exports = app;
