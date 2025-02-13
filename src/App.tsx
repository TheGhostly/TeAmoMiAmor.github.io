import React, { useState } from 'react';
import { Heart, Calendar, Camera, Quote, Music, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [isAnimating, setIsAnimating] = useState(false);

  // Array de imágenes (puedes agregar más grupos de 3)
  const imageGroups = [
    [
      { src: '/foto1.jpg', alt: 'Nuestro primer viaje' },
      { src: '/foto2.jpg', alt: 'Nuestra primera cena' },
      { src: '/foto3.jpg', alt: 'Nuestro aniversario' }
    ],
    [
      { src: '/foto4.jpg', alt: 'Nuestra primera navidad' },
      { src: '/foto5.jpg', alt: 'Viaje a la playa' },
      { src: '/foto6.jpg', alt: 'Cumpleaños juntos' }
    ],
    [
      { src: '/foto7.jpg', alt: 'Nuestro primer concierto' },
      { src: '/foto8.jpg', alt: 'Cena romántica' },
      { src: '/foto9.jpg', alt: 'Paseo en el parque' }
    ]
  ];

  const handlePageChange = (newPage: number, newDirection: 'forward' | 'reverse') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(newDirection);
    
    // Pequeño retraso para permitir que la animación de salida se complete
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
    }, 300);
  };

  const nextPage = () => {
    const newPage = (currentPage + 1) % imageGroups.length;
    handlePageChange(newPage, 'forward');
  };

  const prevPage = () => {
    const newPage = (currentPage - 1 + imageGroups.length) % imageGroups.length;
    handlePageChange(newPage, 'reverse');
  };

  const goToPage = (page: number) => {
    const newDirection = page > currentPage ? 'forward' : 'reverse';
    handlePageChange(page, newDirection);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100">
      {/* Hero Section */}
      <header className="h-screen relative flex flex-col items-center justify-center text-center px-4">
        {/* Fondo con imagen */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1600")' }}
        >
          {/* Overlay oscuro y borroso */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        
        {/* Contenido (ahora con texto en blanco para mejor contraste) */}
        <div className="relative z-10 flex flex-col items-center">
          <Heart className="w-16 h-16 text-rose-400 mb-6 animate-float" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Dos Años Juntos
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Celebrando nuestro amor y todos los momentos especiales
          </p>
          <div className="flex items-center justify-center gap-2 text-rose-300">
            <Calendar className="w-5 h-5" />
            <span className="text-lg">2022 - 2024</span>
          </div>
        </div>
      </header>

      {/* Photo Gallery */}
      <section className="py-20 px-4 bg-white/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 flex items-center justify-center gap-2">
            <Camera className="w-8 h-8 text-rose-500" />
            Nuestros Momentos
          </h2>
          <div className="relative">
            {/* Navigation Buttons */}
            <button 
              onClick={prevPage}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextPage}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Grid */}
            <div className="overflow-hidden">
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
                  direction === 'forward' ? 'slide-enter' : 'slide-enter-reverse'
                }`}
              >
                {imageGroups[currentPage].map((image, index) => (
                  <div 
                    key={index}
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {imageGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === index 
                      ? 'bg-rose-500 w-6 indicator-active' 
                      : 'bg-rose-300 hover:bg-rose-400'
                  }`}
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-12 h-12 text-rose-400 mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
            "Dos años de risas, aventuras y amor incondicional. Cada momento a tu lado
            ha sido un regalo, y no puedo esperar para crear más recuerdos juntos.
            Gracias por ser mi compañera perfecta en este viaje llamado vida."
          </p>
          <div className="flex items-center justify-center gap-2">
            <Music className="w-5 h-5 text-rose-500" />
            <span className="text-gray-600">Nuestra canción siempre sonando</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 bg-white/80">
        <p>Con amor ❤️ 2024</p>
      </footer>
    </div>
  );
}

export default App;