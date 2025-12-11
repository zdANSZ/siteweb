document.addEventListener('DOMContentLoaded', function() {
    atualizarMenu();
});

// Controla esconder/mostrar da navbar com base na direção do scroll
;(function controlNavbarOnScroll(){
    let lastScroll = 0;
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        const current = window.scrollY || window.pageYOffset;
        // quando descer a página e passar 100px, esconder o header
        if (current > lastScroll && current > 100) {
            header.classList.add('hidden');
        } else {
            // quando subir ou estiver no topo, mostra o header
            header.classList.remove('hidden');
        }
        lastScroll = current <= 0 ? 0 : current; // evita negativos
    }, { passive: true });
})();

function atualizarMenu() {
    const navUl = document.querySelector('header nav ul');
    const usuarioId = localStorage.getItem('usuario_id');

    if (usuarioId) {
        // --- MODO LOGADO ---
        // Se o usuário tem ID, montamos o menu com "Minha Conta" e "Sair"
        navUl.innerHTML = `
            <li><a href="index.html">Início</a></li>
            <li><a href="frota.html">Frota</a></li>
            <li><a href="minha_conta.html">Minha Conta</a></li>
            <li><a href="#" id="btn-logout">Sair</a></li>
        `;

        // Adiciona a funcionalidade ao botão Sair
        document.getElementById('btn-logout').addEventListener('click', function(e) {
            e.preventDefault();
            fazerLogout();
        });

    } else {
        // --- MODO VISITANTE ---
        // Se não tem ID, mostre Cadastro e Entrar
        navUl.innerHTML = `
            <li><a href="index.html">Início</a></li>
            <li><a href="frota.html">Frota</a></li>
            <li><a href="cadastro.html">Cadastro</a></li>
            <li><a href="login.html">Entrar</a></li>
        `;
    }
}

function fazerLogout() {
    // Limpa a memória
    localStorage.clear();
    // Redireciona para a home ou login
    window.location.href = 'login.html';
}