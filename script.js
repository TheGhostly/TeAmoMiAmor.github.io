// script.js
const fotos = document.querySelectorAll('.fotos img');

fotos.forEach(foto => {
    foto.addEventListener('mouseover', () => {
        foto.style.boxShadow = '0 0 15px rgba(255, 111, 97, 0.8)';
    });

    foto.addEventListener('mouseout', () => {
        foto.style.boxShadow = 'none';
    });
});
