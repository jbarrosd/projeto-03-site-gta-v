/**
 * modal.js — Gerencia o modal do trailer
 *
 * Responsabilidade: abrir o modal ao clicar em "Assistir Trailer",
 * fechar ao clicar no X ou no fundo, pausar o vídeo ao fechar,
 * e garantir acessibilidade por teclado (ESC, trap de foco).
 */

(function () {
  'use strict';

  /* Seleciona os elementos principais do modal no DOM */
  const modal       = document.getElementById('trailer-modal'); /* elemento do modal */
  const modalVideo  = document.getElementById('trailer-video'); /* elemento de vídeo */
  const openBtn     = document.getElementById('btn-trailer');   /* botão "Assistir Trailer" */
  const closeBtn    = document.getElementById('btn-modal-close'); /* botão X de fechar */
  const backdrop    = modal?.querySelector('.modal__backdrop'); /* fundo escuro clicável */

  /* Se algum elemento essencial não existir na página, encerra o script */
  if (!modal || !modalVideo || !openBtn) return;

  /** Abre o modal e bloqueia o scroll da página */
  function openModal() {
    modal.classList.add('is-open');              /* ativa o CSS de modal visível */
    modal.setAttribute('aria-hidden', 'false'); /* informa leitores de tela que está visível */
    closeBtn?.focus();                           /* move o foco para o botão de fechar */
    document.body.style.overflow = 'hidden';    /* impede scroll da página ao fundo */
  }

  /** Fecha o modal, pausa o vídeo e devolve o foco ao botão que abriu */
  function closeModal() {
    modal.classList.remove('is-open');          /* esconde o modal via CSS */
    modal.setAttribute('aria-hidden', 'true'); /* oculta do leitor de tela */
    modalVideo.pause();                         /* pausa o vídeo */
    modalVideo.currentTime = 0;                 /* volta o vídeo para o início */
    openBtn.focus();                            /* devolve o foco ao botão original */
    document.body.style.overflow = '';          /* restaura o scroll da página */
  }

  /* Abre o modal ao clicar no botão "Assistir Trailer" */
  openBtn.addEventListener('click', openModal);

  /* Fecha o modal ao clicar no botão X */
  closeBtn?.addEventListener('click', closeModal);

  /* Fecha o modal ao clicar no fundo escuro (fora do vídeo) */
  backdrop?.addEventListener('click', closeModal);

  /* Fecha o modal ao pressionar a tecla ESC — acessibilidade por teclado */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  /**
   * Trap de foco — mantém o foco circulando apenas dentro do modal
   * enquanto ele está aberto (acessibilidade para usuários de teclado)
   */
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return; /* só age na tecla Tab */

    /* Busca todos os elementos focáveis dentro do modal */
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];                      /* primeiro elemento focável */
    const last  = focusable[focusable.length - 1];   /* último elemento focável */

    /* Shift+Tab no primeiro elemento vai para o último (ciclo reverso) */
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    /* Tab no último elemento volta para o primeiro (ciclo normal) */
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
