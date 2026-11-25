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
