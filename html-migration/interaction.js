document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const menu = document.querySelector(button.dataset.menuToggle);
    menu?.classList.toggle("open");
    button.setAttribute(
      "aria-expanded",
      menu?.classList.contains("open") ? "true" : "false",
    );
  });
});

document.querySelectorAll("[data-submenu-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const submenu = document.querySelector(button.dataset.submenuToggle);
    submenu?.classList.toggle("hidden");
  });
});

document.querySelectorAll("[data-faq]").forEach((button) => {
  button.addEventListener("click", () =>
    button.closest(".faq-item")?.classList.toggle("open"),
  );
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("hidden");
    form.nextElementSibling?.classList.remove("hidden");
  });
});
