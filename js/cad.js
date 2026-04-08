// ========================================
// CADASTRO DE USUÁRIO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");
  const mensagemErro = document.getElementById("mensagemErro");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // ========================================
    // PEGAR VALORES
    // ========================================
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const termos = document.getElementById("termos").checked;

    mensagemErro.textContent = "";

    // ========================================
    // VALIDAÇÕES
    // ========================================

    if (!nome || !email || !senha || !confirmarSenha) {
      mensagemErro.textContent = "Preencha todos os campos obrigatórios.";
      return;
    }

    if (senha.length < 6) {
      mensagemErro.textContent = "A senha deve ter no mínimo 6 caracteres.";
      return;
    }

    if (senha !== confirmarSenha) {
      mensagemErro.textContent = "As senhas não coincidem.";
      return;
    }

    if (!termos) {
      mensagemErro.textContent = "Você precisa aceitar os termos.";
      return;
    }

    // ========================================
    // VERIFICAR SE EMAIL JÁ EXISTE
    // ========================================

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExiste = usuarios.find(user => user.email === email);

    if (usuarioExiste) {
      mensagemErro.textContent = "Este e-mail já está cadastrado.";
      return;
    }

    // ========================================
    // SALVAR USUÁRIO
    // ========================================

    const novoUsuario = {
      nome,
      email,
      telefone,
      senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // ========================================
    // SUCESSO
    // ========================================

    alert("Cadastro realizado com sucesso! 🎉");

    form.reset();

    // Redireciona para login (opcional)
    window.location.href = "login.html";
  });
});