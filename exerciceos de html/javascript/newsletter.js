const form = document.getElementById("newsletterForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("emailNews");
    const check = document.getElementById("privacidade");
    const msg = document.getElementById("msg");

    if (!check.checked) {
      msg.textContent = "Aceite a política.";
      msg.style.color = "red";
      return;
    }

    if (!email.checkValidity()) {
      msg.textContent = "Email inválido.";
      msg.style.color = "red";
      return;
    }

    msg.textContent = "Inscrito com sucesso!";
    msg.style.color = "green";

    form.reset();
  });
}