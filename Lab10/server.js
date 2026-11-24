// Лабораторна №10. Іван Гребенюк (Grebenuk), 305-ТН.
const express = require('express');
const path = require('node:path');
const app = express();
const PORT = process.env.PORT || 3000;

// Канонічні адреси без кінцевого / зберігають відносні посилання на CSS.
app.use((req, res, next) => {
  const pagesWithSlash = ['/index.html/', '/float/', '/float.html/',
    '/flexbox/', '/flexbox.html/', '/grid/', '/grid.html/'];
  if (pagesWithSlash.includes(req.path)) {
    return res.redirect(301, req.path.slice(0, -1));
  }
  next();
});

// CSS доступні як статичні ресурси. Абсолютний шлях не залежить від cwd.
app.use('/css', express.static(path.join(__dirname, 'css')));

// Окремий маршрут для кожної раніше створеної HTML-сторінки.
// .html-адреси залишено для роботи тих самих посилань без сервера.
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get(['/float', '/float.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'float.html'));
});
app.get(['/flexbox', '/flexbox.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'flexbox.html'));
});
app.get(['/grid', '/grid.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'grid.html'));
});

app.use((req, res) => {
  res.status(404).type('text/plain').send('Сторінку не знайдено');
});

const server = app.listen(PORT, () => {
  console.log(`Лабораторна №10: http://localhost:${PORT}`);
});
server.on('error', (error) => {
  console.error(`Не вдалося запустити сервер: ${error.message}`);
  process.exitCode = 1;
});
