/**
 * platforms.js — Gerencia os dropdowns de seleção de plataforma
 *
 * Responsabilidade: abrir/fechar a lista de plataformas ao clicar no botão,
 * garantir que apenas um dropdown fique aberto por vez,
 * e fechar ao clicar fora ou pressionar ESC.
 */

(function () {
  'use strict';

  /* Seleciona todos os seletores de plataforma na página */
  const selectors = document.querySelectorAll('.platform-selector');

  /* Se não houver nenhum seletor na página, encerra o script */
  if (!selectors.length) return;

  /* Configura o comportamento de cada seletor individualmente */
  selectors.forEach((selector) => {
    const btn      = selector.querySelector('.platform-selector__btn');      /* botão "Selecionar plataforma" */
    const dropdown = selector.querySelector('.platform-selector__dropdown'); /* lista de plataformas */

    /* Se o botão ou dropdown não existir, pula este seletor */
    if (!btn || !dropdown) return;

    /** Abre o dropdown de plataformas */
    function openDropdown() {
      dropdown.classList.add('is-open');          /* exibe a lista via CSS */
      btn.setAttribute('aria-expanded', 'true'); /* informa leitores de tela */
    }

    /** Fecha o dropdown de plataformas */
    function closeDropdown() {
      dropdown.classList.remove('is-open');        /* oculta a lista via CSS */
      btn.setAttribute('aria-expanded', 'false'); /* atualiza estado para leitores */
    }

    /* Abre/fecha ao clicar no botão */
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); /* impede que o clique propague e feche imediatamente */

      const isOpen = dropdown.classList.contains('is-open');

      /* Fecha todos os outros dropdowns abertos na página antes de abrir este */
      document.querySelectorAll('.platform-selector__dropdown.is-open').forEach((d) => {
        d.classList.remove('is-open');
        d.previousElementSibling?.setAttribute('aria-expanded', 'false');
      });

      /* Se estava fechado, abre; se estava aberto, permanece fechado */
      isOpen ? closeDropdown() : openDropdown();
    });

    /* Fecha com ESC quando o foco está dentro do seletor */
    selector.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  });

  /* Fecha qualquer dropdown aberto ao clicar em qualquer lugar fora deles */
  document.addEventListener('click', () => {
    document.querySelectorAll('.platform-selector__dropdown.is-open').forEach((d) => {
      d.classList.remove('is-open');
      d.previousElementSibling?.setAttribute('aria-expanded', 'false');
    });
  });
})();
