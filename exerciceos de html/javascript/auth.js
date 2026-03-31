// LOGIN (simples)
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login realizado!");
  });
}

// CADASTRO
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;
    const termos = document.getElementById("termos").checked;

    if (senha !== confirmar) {
      alert("Senhas não coincidem");
      return;
    }

    if (!termos) {
      alert("Aceite os termos");
      return;
    }

    alert("Cadastro realizado!");
  });
}