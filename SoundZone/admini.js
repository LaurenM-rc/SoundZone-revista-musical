// ======== Seleção de Elementos =========
const form = document.getElementById("form-cadastro");
const listaUsuarios = document.getElementById("listaUsuarios");
const pesquisa = document.getElementById("pesquisa");
const btnLimpar = document.getElementById("limparCampos");
const btnApagarTudo = document.getElementById("apagarTudo");

// ======== Recuperar usuários do LocalStorage =========
function obterUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// ======== Salvar no LocalStorage =========
function salvarUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
}

// ======== Renderizar lista na tela =========
function renderizar(listaOverride = null) {
    const usuarios = obterUsuarios();
    const lista = listaOverride || usuarios;

    listaUsuarios.innerHTML = "";

    lista.forEach(user => {
        const indexReal = usuarios.indexOf(user);

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${user.nome}</strong> - ${user.email} 
            <br>
            <small>Registrado em: ${user.data}</small>
            <br>
            <button class="excluir" data-index="${indexReal}">Excluir</button>
        `;

        listaUsuarios.appendChild(li);
    });

    adicionarEventosExcluir();
}

// ======== Cadastro =========
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;  // ← ADICIONADO

    const novoUsuario = {
        nome,
        email,
        senha,
        data: new Date().toLocaleString("pt-BR")
    };

    const usuarios = obterUsuarios();
    usuarios.push(novoUsuario);

    salvarUsuarios(usuarios);
    renderizar();

    form.reset();
});

// ======== Limpar campos =========
btnLimpar.addEventListener("click", () => {
    form.reset();
});

// ======== Excluir individual =========
function adicionarEventosExcluir() {
    const botoes = document.querySelectorAll(".excluir");

    botoes.forEach(btn => {
        btn.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            const usuarios = obterUsuarios();

            usuarios.splice(index, 1);
            salvarUsuarios(usuarios);
            renderizar();
        });
    });
}

// ======== Apagar todos =========
btnApagarTudo.addEventListener("click", () => {
    if (confirm("Deseja realmente apagar todos os usuários?")) {
        localStorage.removeItem("usuarios");
        renderizar();
    }
});

// ======== Pesquisa =========
pesquisa.addEventListener("input", function () {
    const texto = this.value.toLowerCase();
    const usuarios = obterUsuarios();

    const filtrados = usuarios.filter(u =>
        u.nome.toLowerCase().includes(texto) ||
        u.email.toLowerCase().includes(texto)
    );

    renderizar(filtrados);
});

// ======== Carregar ao abrir a página =========
renderizar();