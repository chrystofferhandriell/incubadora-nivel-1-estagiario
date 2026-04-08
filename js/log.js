// ========================================
// LOGIN DE USUÁRIO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // ========================================
    // PEGAR DADOS
    // ========================================
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // ========================================
    // BUSCAR USUÁRIOS
    // ========================================
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // ========================================
    // VALIDAR LOGIN
    // ========================================
    const usuario = usuarios.find(
      (user) => user.email === email && user.senha === senha
    );

    if (!usuario) {
      alert("E-mail ou senha inválidos ❌");
      return;
    }

    // ========================================
    // SALVAR USUÁRIO LOGADO
    // ========================================
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    // ========================================
    // SUCESSO
    // ========================================
    alert(`Bem-vindo, ${usuario.nome}! 🎉`);

    // Redireciona (mude se quiser)
    window.location.href = "index.html";
  });
});