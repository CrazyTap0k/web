// Перевірка підтвердження пароля; без збереження чи надсилання даних.
function confirmationMessage(password, confirmation) {
  return confirmation && password !== confirmation ? 'Паролі не збігаються.' : '';
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('registration-form');
  const password = document.getElementById('password');
  const confirmation = document.getElementById('password-confirmation');
  const result = document.getElementById('form-result');

  function validateConfirmation() {
    confirmation.setCustomValidity(confirmationMessage(password.value, confirmation.value));
  }
  form.addEventListener('input', () => {
    result.hidden = true;
    validateConfirmation();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateConfirmation();
    if (!form.reportValidity()) return;
    result.textContent = 'Форму заповнено правильно.';
    result.hidden = false;
  });
}

// Дозволяє перевірити чисту функцію окремо від інтерфейсу браузера.
if (typeof module !== 'undefined') module.exports = { confirmationMessage };
