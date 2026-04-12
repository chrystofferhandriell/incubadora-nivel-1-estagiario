// ===============================
// DARK MODE
// ===============================

const themeToggle = document.getElementById("themeToggle");

// pegar tema salvo
const savedTheme = localStorage.getItem("theme");

// aplicar tema salvo ao carregar
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme);
}

// alternar tema
themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);

  localStorage.setItem("theme", newTheme);

  updateIcon(newTheme);
});

// atualizar ícone
function updateIcon(theme) {
  if (!themeToggle) return;

  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}