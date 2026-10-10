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

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const abierto = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(abierto));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
