/* Лабораторна №15. Гребенюк Іван Юрійович, 305-ТН, №07.
   Функції обчислень не залежать від HTML та можуть перевірятися окремо. */
(function (root) {
  'use strict';

  // 1. Усі прості числа на відрізку [0; 100]. Обидва цикли — while.
  function getPrimes() {
    const primes = [];
    let number = 0;
    while (number <= 100) {
      let isPrime = number >= 2;
      let divisor = 2;
      while (isPrime && divisor * divisor <= number) {
        if (number % divisor === 0) isPrime = false;
        divisor += 1;
      }
      if (isPrime) primes.push(number);
      number += 1;
    }
    return primes;
  }

  // 2. do…while виконує тіло щонайменше один раз.
  function describeNumbers() {
    const lines = [];
    let number = 0;
    do {
      let description;
      if (number === 0) description = 'це нуль';
      else if (number % 2 === 0) description = 'парне число';
      else description = 'непарне число';
      lines.push(number + ' – ' + description);
      number += 1;
    } while (number <= 10);
    return lines;
  }

  // 3. Зупиняємося лише після того, як result стане МЕНШИМ за 50.
  function divideNumber() {
    const numb = 10000;
    let result = numb;
    let counter = 0;
    while (result >= 50) {
      result /= 2;
      counter += 1;
    }
    return { result: result, counter: counter };
  }

  // 4. Зима: 12, 1, 2; весна: 3–5; літо: 6–8; осінь: 9–11.
  function getMonthInfo(month) {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      throw new RangeError('Введи ціле число від 1 до 12.');
    }
    const names = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
      'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    let season;
    if (month === 12 || month <= 2) season = 'зима';
    else if (month <= 5) season = 'весна';
    else if (month <= 8) season = 'літо';
    else season = 'осінь';
    return { month: month, name: names[month - 1], season: season };
  }

  // 5. Tf = (9/5) * Tc + 32.
  function celsiusToFahrenheit(celsius) {
    if (!Number.isFinite(celsius)) throw new TypeError('Введи скінченне число.');
    const fahrenheit = (9 / 5) * celsius + 32;
    if (!Number.isFinite(fahrenheit)) throw new RangeError('Значення температури завелике.');
    return fahrenheit;
  }

  // 6. Нумерація днів: понеділок = 1, неділя = 7.
  function getWeekday(day) {
    if (!Number.isInteger(day) || day < 1 || day > 7) {
      throw new RangeError('Введи ціле число від 1 до 7.');
    }
    const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота', 'Неділя'];
    return days[day - 1];
  }

  const tasks = { getPrimes: getPrimes, describeNumbers: describeNumbers, divideNumber: divideNumber,
    getMonthInfo: getMonthInfo, celsiusToFahrenheit: celsiusToFahrenheit, getWeekday: getWeekday };
  if (root) root.Lab15 = tasks;
  if (typeof module !== 'undefined' && module.exports) module.exports = tasks;
}(typeof window !== 'undefined' ? window : null));
