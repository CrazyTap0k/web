/* Виведення на сторінку, в консоль і модальні вікна згідно з умовою. */
(function () {
  'use strict';
  const tasks = window.Lab15;
  function show(id, text, state) {
    const output = document.getElementById(id);
    output.textContent = text;
    output.dataset.state = state || 'success';
  }
  function error(id, message) {
    show(id, message, 'error');
    window.alert(message);
  }
  function formatNumber(value) {
    return String(Number(value.toFixed(8)));
  }

  function runPrimes() {
    show('primes-output', tasks.getPrimes().join(', '));
  }
  function runParity() {
    show('parity-output', tasks.describeNumbers().join('\n'));
  }
  function runDivision() {
    const values = tasks.divideNumber();
    const result = values.result;
    const counter = values.counter;
    console.log('result =', result);
    console.log('counter =', counter);
    show('division-output', 'result = ' + result + '\ncounter = ' + counter);
  }
  function runMonth() {
    const raw = window.prompt('Введи номер місяця від 1 до 12:', '11');
    if (raw === null) { show('month-output', 'Введення скасовано.', 'neutral'); return; }
    if (!raw.trim()) { error('month-output', 'Введи ціле число від 1 до 12.'); return; }
    const month = Number(raw.trim());
    try {
      const info = tasks.getMonthInfo(month);
      const message = 'Місяць: ' + info.name + ' (' + month + ')\nПора року: ' + info.season;
      show('month-output', message);
      window.alert(message);
    } catch (exception) { error('month-output', exception.message); }
  }
  function runTemperature() {
    const raw = document.getElementById('celsius').value.trim();
    if (!raw) { error('temperature-output', 'Введи температуру за Цельсієм.'); return; }
    const celsius = Number(raw);
    try {
      const fahrenheit = tasks.celsiusToFahrenheit(celsius);
      const message = formatNumber(celsius) + ' °C = ' + formatNumber(fahrenheit) + ' °F';
      show('temperature-output', message);
      window.alert(message);
    } catch (exception) { error('temperature-output', exception.message); }
  }
  function runWeekday() {
    const raw = window.prompt('Введи номер дня тижня від 1 до 7:', '1');
    if (raw === null) { show('weekday-output', 'Введення скасовано.', 'neutral'); return; }
    if (!raw.trim()) { error('weekday-output', 'Введи ціле число від 1 до 7.'); return; }
    const day = Number(raw.trim());
    try {
      show('weekday-output', day + ' — ' + tasks.getWeekday(day));
    } catch (exception) { error('weekday-output', exception.message); }
  }

  document.getElementById('run-primes').addEventListener('click', runPrimes);
  document.getElementById('run-parity').addEventListener('click', runParity);
  document.getElementById('run-division').addEventListener('click', runDivision);
  document.getElementById('run-month').addEventListener('click', runMonth);
  document.getElementById('run-temperature').addEventListener('click', runTemperature);
  document.getElementById('run-weekday').addEventListener('click', runWeekday);

  // Перші три завдання одразу показують результат без модальних вікон.
  runPrimes();
  runParity();
  runDivision();
}());
