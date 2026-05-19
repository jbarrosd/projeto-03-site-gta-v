/**
 * nav.js — Gerencia a navegação mobile (menu hamburguer)
 *
 * Responsabilidade: abrir e fechar o menu lateral em telas pequenas,
 * controlar o overlay de fundo, e fechar com a tecla ESC.
 * Em desktop, este script fica inativo pois o menu é visível o tempo todo.
 */

(function () {
  'use strict';

  /* Seleciona os elementos do menu mobile no DOM */
  const hamburger = document.getElementById('hamburger');   /* botão ☰ */
  const nav       = document.getElementById('main-nav');    /* painel de navegação */
  const overlay   = document.getElementById('nav-overlay'); /* fundo escuro atrás do menu */

  /* Se os elementos não existirem na página, encerra o script */
  if (!hamburger || !nav) return;

  /** Abre o menu lateral e bloqueia o scroll da página */
  function openNav() {
    nav.classList.add('is-open');                    /* desliza o menu para dentro */
    overlay?.classList.add('is-visible');            /* exibe o fundo escuro */
    hamburger.setAttribute('aria-expanded', 'true'); /* informa leitores de tela */
    document.body.style.overflow = 'hidden';         /* bloqueia scroll da página */
  }

  /** Fecha o menu lateral e restaura o scroll da página */
  function closeNav() {
    nav.classList.remove('is-open');                  /* desliza o menu para fora */
    overlay?.classList.remove('is-visible');          /* oculta o fundo escuro */
    hamburger.setAttribute('aria-expanded', 'false'); /* atualiza estado para leitores */
    document.body.style.overflow = '';                /* restaura scroll da página */
  }

  /** Alterna entre aberto e fechado ao clicar no hamburguer */
  function toggleNav() {
    const isOpen = nav.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  }

  /* Abre/fecha ao clicar no botão hamburguer */
  hamburger.addEventListener('click', toggleNav);

  /* Fecha ao clicar no fundo escuro (fora do menu) */
  overlay?.addEventListener('click', closeNav);

  /* Fecha automaticamente ao clicar em qualquer link do menu */
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  /* Fecha o menu ao pressionar ESC — acessibilidade por teclado */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      hamburger.focus(); /* devolve o foco ao botão hamburguer */
    }
  });
})();
