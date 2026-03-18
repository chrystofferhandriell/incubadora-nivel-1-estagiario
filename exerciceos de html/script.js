  
    const form = document.querySelector("formCadastro");
    const erro = document.querySelector("mensagemErro");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const senha = document.querySelector("senha").value;
      const confirmar = document.querySelector("confirmarSenha").value;
      const termos = document.querySelector("termos").checked;

      erro.textContent = "";

      // Validação senha
      if (senha !== confirmar) {
        erro.textContent = "As senhas não coincidem.";
        return;
      }

      // Validação termos
      if (!termos) {
        erro.textContent = "Você precisa aceitar os termos.";
        return;
      }

      // Sucesso
      alert("Cadastro realizado com sucesso!");
      form.reset();
    });
  