/**
 * ESTE ARQUIVO FAZ:
 * 1. Trocar o tema (Claro/Escuro).
 * 2. Salvar qual perfil você clicou.
 * 3. Te levar para a próxima página (Catálogo).
 */

(function () {
  'use strict';

  // --- PARTE 1: TROCAR AS CORES DO SITE ---
  function configurarBotaoTema() {
    const botao = document.getElementById('theme-toggle');
    if (!botao) return;

    botao.addEventListener('click', function () {
      const temaAtual = document.documentElement.getAttribute('data-theme');
      const novoTema = temaAtual === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', novoTema);
      const icone = botao.querySelector('.theme-toggle__icon');
      if (icone) icone.textContent = novoTema === 'light' ? '☀️' : '🌙';

      localStorage.setItem('theme', novoTema);
    });
  }

  // --- PARTE 2: CLICAR NO PERFIL E IR PARA O CATÁLOGO ---
  function configurarPerfis() {
    const todosOsPerfis = document.querySelectorAll('.profile');

    todosOsPerfis.forEach(perfil => {
      perfil.addEventListener('click', function () {

        todosOsPerfis.forEach(p => p.classList.remove('selected'));
        perfil.classList.add('selected');

        const nomeClicado = perfil.querySelector('p').textContent.trim();
        // CORREÇÃO: usar .src (propriedade JS) devolve o caminho absoluto completo,
        // funcionando independentemente de qual pasta a página está aberta.
        const fotoClicada = perfil.querySelector('img').src;

        // CORREÇÃO PRINCIPAL: localStorage é bloqueado pelo Chrome quando o site
        // é aberto via file://. A solução é passar os dados pela URL (query string).
        const params = new URLSearchParams();
        params.set('nome', nomeClicado);
        params.set('img', fotoClicada);

        setTimeout(() => {
          window.location.href = './catalogo/catalogo.html?' + params.toString();
        }, 400);
      });
    });
  }

  function iniciar() {
    configurarBotaoTema();
    configurarPerfis();
  }

  iniciar();
})();