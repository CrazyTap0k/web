// Демо: браузер перевіряє required та формат полів до події submit.
// Відкриваємо тільки локальну сторінку результату, без полів форми в URL.
for (const form of document.querySelectorAll("form[data-demo]")) {
  const status = form.querySelector("[role=status]");
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (form.target === "_blank") {
      window.open(form.action, "_blank", "noopener");
      status.textContent = "Підтвердження відкривається в новій вкладці.";
    } else {
      window.location.assign(form.action);
    }
  });
  form.addEventListener("reset", () => { status.textContent = ""; });
}
const dateButton = document.querySelector("#today-button");
if (dateButton) {
  dateButton.addEventListener("click", () => {
    dateButton.form.querySelector("[role=status]").textContent =
      new Date().toLocaleDateString("uk-UA", {dateStyle: "long"});
  });
}
