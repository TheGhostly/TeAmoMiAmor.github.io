const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const grid = document.querySelector('.grid');
const images = grid.querySelectorAll('.image-card');
let currentPage = 0;

function showPage(page) {
  // Oculta todas las imágenes
  images.forEach(image => image.style.display = 'none');
  // Muestra las imágenes de la página actual
  for (let i = page * 4; i < (page + 1) * 4; i++) {
    if (images[i]) {
      images[i].style.display = 'block';
    }
  }
}

prevBtn.addEventListener('click', () => {
  currentPage = Math.max(0, currentPage - 1);
  showPage(currentPage);
});

nextBtn.addEventListener('click', () => {
  currentPage = Math.min(Math.floor(images.length / 4), currentPage + 1);
  showPage(currentPage);
});

showPage(currentPage); // Muestra la primera página al cargar la página