/* Мобільне меню. Перший файл у спільній JS-збірці. */
(function () {
  'use strict';
  document.documentElement.classList.add('js-enabled');
  var header = document.querySelector('.site-header');
  var button = document.querySelector('.menu-toggle');
  if (!header || !button) return;
  button.hidden = false;
  button.addEventListener('click', function () {
    var open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-open', open);
  });
}());

/* Пошук серед усіх назв без зовнішніх запитів. */
(function () {
  'use strict';
  var toggle = document.querySelector('.search-toggle');
  var panel = document.getElementById('search-panel');
  var input = document.getElementById('catalog-search');
  var status = document.getElementById('search-status');
  if (!toggle || !panel || !input || !status) return;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.movie-card'));
  function filterCards() {
    var query = input.value.trim().toLocaleLowerCase('uk');
    var visible = 0;
    cards.forEach(function (card) {
      var title = card.getAttribute('data-title').toLocaleLowerCase('uk');
      card.hidden = title.indexOf(query) === -1;
      if (!card.hidden) visible += 1;
    });
    status.textContent = query ? 'Знайдено назв: ' + visible : '';
  }
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    if (open) input.focus();
    else { input.value = ''; filterCards(); }
  });
  input.addEventListener('input', filterCards);
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { toggle.click(); toggle.focus(); }
  });
}());
