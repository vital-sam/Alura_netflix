// main.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS DO PERFIL ATIVO via URL
    const params       = new URLSearchParams(window.location.search);
    const nomePerfil   = params.get('nome')  || 'Nestor';
    const imagemPerfil = params.get('img')   || '../Assets/perfil1.jpg';

    const profileIcon = document.getElementById('user-profile-img');
    if (profileIcon) profileIcon.src = imagemPerfil;

    document.querySelectorAll('.profile-dropdown__item').forEach(item => {
        if (item.dataset.nome === nomePerfil) item.classList.add('active-profile');
    });

    // 2. RENDERIZA O CATALOGO DO PERFIL
    // CORRECAO: getCatalogo(nomePerfil) em vez da antiga variavel 'categories'
    const container = document.getElementById('main-content');
    if (container) {
        getCatalogo(nomePerfil).forEach(category => {
            container.appendChild(createCarousel(category));
        });
    }

    // 3. BUSCA
    const searchWrapper = document.getElementById('search-wrapper');
    const searchIcon    = document.getElementById('search-icon');
    const searchInput   = document.getElementById('search-input');
    const searchOverlay = document.getElementById('search-overlay');
    const searchResults = document.getElementById('search-results-container');
    const searchEmpty   = document.getElementById('search-empty-msg');

    searchIcon.addEventListener('click', () => {
        const isOpen = searchWrapper.classList.toggle('open');
        if (isOpen) { searchInput.focus(); }
        else { searchInput.value = ''; fecharBusca(); }
    });

    searchInput.addEventListener('input', () => {
        const termo = searchInput.value.trim().toLowerCase();
        if (!termo) { fecharBusca(); return; }

        container.style.display = 'none';
        searchOverlay.classList.remove('hidden');
        searchResults.innerHTML = '';

        // CORRECAO: getCatalogo(nomePerfil) em vez de 'categories'
        const encontrados = [];
        getCatalogo(nomePerfil).forEach(cat => {
            cat.items.forEach(item => {
                const titulo = (item.title || cat.title || '').toLowerCase();
                if (titulo.includes(termo)) encontrados.push(item);
            });
        });

        searchEmpty.style.display = encontrados.length === 0 ? 'block' : 'none';
        encontrados.forEach(item => searchResults.appendChild(createCard(item)));
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            searchWrapper.classList.remove('open');
            searchInput.value = '';
            fecharBusca();
        }
    });

    function fecharBusca() {
        searchOverlay.classList.add('hidden');
        container.style.display = '';
        searchResults.innerHTML = '';
        searchEmpty.style.display = 'none';
    }

    // 4. NOTIFICACOES
    const notifBtn   = document.getElementById('notification-btn');
    const notifPopup = document.getElementById('notification-popup');
    const notifCount = document.getElementById('notification-count');

    notifBtn.addEventListener('click', e => {
        e.stopPropagation();
        const aberto = notifPopup.classList.toggle('open');
        profileDropdown.classList.remove('open');
        profileMenuBtn.classList.remove('open');
        if (aberto) {
            notifCount.style.display = 'none';
            setTimeout(() => {
                document.querySelectorAll('.notification-item.unread')
                    .forEach(el => el.classList.remove('unread'));
            }, 1500);
        }
    });

    // 5. DROPDOWN DE PERFIL
    const profileMenuBtn  = document.getElementById('profile-menu-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const logoutBtn       = document.getElementById('logout-btn');

    profileMenuBtn.addEventListener('click', e => {
        e.stopPropagation();
        profileMenuBtn.classList.toggle('open');
        profileDropdown.classList.toggle('open');
        notifPopup.classList.remove('open');
    });

    document.querySelectorAll('.profile-dropdown__item').forEach(item => {
        item.addEventListener('click', () => {
            const nome = item.dataset.nome;
            const img  = item.dataset.img;
            const link = document.createElement('a');
            link.href  = img;
            const urlParams = new URLSearchParams();
            urlParams.set('nome', nome);
            urlParams.set('img', link.href);
            window.location.href = 'catalogo.html?' + urlParams.toString();
        });
    });

    logoutBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.addEventListener('click', () => {
        notifPopup.classList.remove('open');
        profileDropdown.classList.remove('open');
        profileMenuBtn.classList.remove('open');
    });

});
