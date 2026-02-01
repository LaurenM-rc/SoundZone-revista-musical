document.getElementById("form-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const novoUsuario = { nome, email, senha };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    window.location.href = "login.html";
});

// Mostrar/ocultar senha
document.getElementById("toggleSenha").addEventListener("click", function () {
    const campo = document.getElementById("senha");

    campo.type = campo.type === "password" ? "text" : "password";

    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
});