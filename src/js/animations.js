/**
 * animations.js — Animações de entrada com ScrollReveal
 *
 * Responsabilidade: configurar e disparar animações de "aparecer"
 * conforme o usuário rola a página. Cada seção tem sua própria
 * configuração de direção, delay e intervalo entre elementos.
 *
 * Biblioteca usada: ScrollReveal (carregada via CDN no HTML)
 */

(function () {
  'use strict';

  /* Garante que a biblioteca ScrollReveal foi carregada antes de usar */
  if (typeof ScrollReveal === 'undefined') return;

  /* Configurações base compartilhadas por todas as animações */
  const BASE = {
    distance : '40px',   /* distância que o elemento percorre ao entrar */
    duration : 900,      /* duração da animação em milissegundos */
    easing   : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', /* curva suave de aceleração */
    reset    : false,    /* false = anima só na primeira vez que aparece */
  };

  /* Cria a instância do ScrollReveal */
  const sr = ScrollReveal();

  /* ---- Animações da seção Hero (página inicial) ---- */
  /* Cada elemento sobe de baixo com um delay crescente (efeito cascata) */
  sr.reveal('.hero__logos',    { ...BASE, origin: 'bottom', delay: 200 });
  sr.reveal('.hero__title',    { ...BASE, origin: 'bottom', delay: 350 });
  sr.reveal('.hero__subtitle', { ...BASE, origin: 'bottom', delay: 450 });
  sr.reveal('.hero__actions',  { ...BASE, origin: 'bottom', delay: 550 });

  /* ---- Animações da seção Sobre o GTA V ---- */
  /* Imagem vem da esquerda, texto vem da direita — efeito de abertura */
  sr.reveal('.about-gtav__image',  { ...BASE, origin: 'left',  delay: 200 });
  sr.reveal('.about-gtav__text',   { ...BASE, origin: 'right', delay: 300 });

  /* ---- Animações da seção Sobre o GTA Online ---- */
  /* Invertido: texto vem da esquerda, imagem vem da direita */
  sr.reveal('.about-gtaonline__text',  { ...BASE, origin: 'left',  delay: 200 });
  sr.reveal('.about-gtaonline__image', { ...BASE, origin: 'right', delay: 300 });

  /* ---- Animações dos cards de personagens ---- */
  /* interval: cada card aparece 150ms depois do anterior (stagger) */
  sr.reveal('.character-card', {
    ...BASE,
    origin   : 'bottom',
    delay    : 100,
    interval : 150, /* atraso entre cada card — cria efeito de cascata */
  });

  /* ---- Animações da seção Comprar ---- */
  /* Título primeiro, depois os cards com intervalo entre eles */
  sr.reveal('.purchase__title', { ...BASE, origin: 'bottom', delay: 100 });
  sr.reveal('.purchase-card',   {
    ...BASE,
    origin   : 'bottom',
    delay    : 200,
    interval : 200, /* intervalo maior entre os cards de compra */
  });
})();
