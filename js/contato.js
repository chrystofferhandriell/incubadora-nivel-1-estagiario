/* SCRIPT */

    const form = document.getElementById("contactForm");
    const status = document.getElementById("statusMensagem");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const assunto = document.getElementById("assunto").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();

      if (!nome || !email || !assunto || !mensagem) {
        status.textContent = "Preencha todos os campos!";
        status.style.color = "red";
        return;
      }

      // Simulação de envio
      status.textContent = "Mensagem enviada com sucesso!";
      status.style.color = "green";

      form.reset();
    });
  
