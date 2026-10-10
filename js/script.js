'use strict';
// Cumple de Juana: 14/11/2026, 10:30 en Buenos Aires (UTC-3).
const fechaCumple = new Date('2026-11-14T10:30:00-03:00');
const numero = (n) => String(n).padStart(2, '0');
function actualizarContador() {
  const diferencia = Math.max(0, fechaCumple.getTime() - Date.now());
  const segundos = Math.floor(diferencia / 1000);
  document.getElementById('days').textContent = Math.floor(segundos / 86400);
  document.getElementById('hours').textContent = numero(Math.floor(segundos / 3600) % 24);
  document.getElementById('minutes').textContent = numero(Math.floor(segundos / 60) % 60);
  document.getElementById('seconds').textContent = numero(segundos % 60);
  if (diferencia === 0) document.getElementById('countdown-note').textContent = '¡Llegó el gran día! ✨';
}
actualizarContador();
setInterval(actualizarContador, 1000);

// Galería: colocar foto1.jpg, foto2.jpg, foto3.jpg y foto4.jpg en la carpeta img.
// Si una imagen no existe, queda el fondo decorativo de muestra.
const slides = [...document.querySelectorAll('.slide')];
slides.forEach((slide, i) => {
  const image = new Image();
  image.alt = `Foto ${i + 1} de Juana`;
  image.onload = () => { slide.replaceChildren(image); };
  image.src = `img/${slide.dataset.photo}`;
});
const dotsContainer = document.querySelector('.slide-dots');
let currentSlide = 0;
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Mostrar foto ${i + 1}`);
  dot.addEventListener('click', () => mostrarFoto(i));
  dotsContainer.append(dot);
});
const dots = [...dotsContainer.children];
function mostrarFoto(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}
document.querySelector('.slide-arrow.prev').addEventListener('click', () => mostrarFoto(currentSlide - 1));
document.querySelector('.slide-arrow.next').addEventListener('click', () => mostrarFoto(currentSlide + 1));
mostrarFoto(0);
setInterval(() => mostrarFoto(currentSlide + 1), 4000);

// Tres Pinos: galería independiente, con el logo fijo sobre las fotos.
const destinationGallery = document.querySelector('.destination-gallery');
if (destinationGallery) {
  const photos = [...destinationGallery.querySelectorAll('.destination-slide')];
  const counter = destinationGallery.querySelector('.destination-counter');
  const pauseButton = destinationGallery.querySelector('.destination-pause');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let photoIndex = 0;
  let paused = reducedMotion.matches;
  let timer;

  function showDestinationPhoto(index) {
    photoIndex = (index + photos.length) % photos.length;
    photos.forEach((photo, i) => {
      photo.classList.toggle('active', i === photoIndex);
      photo.setAttribute('aria-hidden', String(i !== photoIndex));
    });
    counter.textContent = `${photoIndex + 1} / ${photos.length}`;
  }

  function updateDestinationTimer() {
    clearInterval(timer);
    pauseButton.textContent = paused ? 'Reproducir' : 'Pausar';
    if (!paused && !document.hidden) {
      timer = setInterval(() => showDestinationPhoto(photoIndex + 1), 5000);
    }
  }

  function stepDestinationPhoto(direction) {
    showDestinationPhoto(photoIndex + direction);
    updateDestinationTimer();
  }

  destinationGallery.querySelector('.prev').addEventListener('click', () => stepDestinationPhoto(-1));
  destinationGallery.querySelector('.next').addEventListener('click', () => stepDestinationPhoto(1));
  pauseButton.addEventListener('click', () => {
    paused = !paused;
    updateDestinationTimer();
  });
  destinationGallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      stepDestinationPhoto(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  reducedMotion.addEventListener('change', () => {
    paused = reducedMotion.matches;
    updateDestinationTimer();
  });
  document.addEventListener('visibilitychange', updateDestinationTimer);
  updateDestinationTimer();
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const mobileMenu = window.matchMedia('(max-width: 760px)');

function setMenuOpen(open, returnFocus = false) {
  nav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menuButton.textContent = open ? '×' : '☰';
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  setMenuOpen(!nav.classList.contains('open'));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  setMenuOpen(false);
}));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) setMenuOpen(false, true);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) setMenuOpen(false);
});
document.addEventListener('focusin', (event) => {
  if (!event.target.closest('.site-header')) setMenuOpen(false);
});
mobileMenu.addEventListener('change', () => setMenuOpen(false));
