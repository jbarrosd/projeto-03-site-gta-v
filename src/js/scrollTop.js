/**
 * scrollTop.js — Botão flutuante "Voltar ao topo"
 *
 * Responsabilidade: exibir o botão após o usuário rolar a página
 * além de 60% da altura da janela, e rolar suavemente ao topo ao clicar.
 */

(function () {
  'use strict';

  /* Seleciona o botão flutuante no DOM */
  const btn = document.getElementById('scroll-top');

  /* Se o botão não existir na página, encerra o script */
  if (!btn) return;

  /* Limite de scroll em pixels para o botão aparecer (60% da altura visível) */
  const THRESHOLD = window.innerHeight * 0.6;

  /**
   * Verifica a posição atual do scroll e mostra/esconde o botão.
   * Chamada a cada evento de scroll da página.
   */
  function onScroll() {
    if (window.scrollY > THRESHOLD) {
      btn.classList.add('is-visible');    /* exibe o botão com animação CSS */
    } else {
      btn.classList.remove('is-visible'); /* esconde o botão com animação CSS */
    }
  }

  /* Rola suavemente ao topo ao clicar no botão */
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Escuta o evento de scroll — passive:true melhora a performance */
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Verifica o estado inicial (caso a página seja recarregada já com scroll) */
  onScroll();
})();
