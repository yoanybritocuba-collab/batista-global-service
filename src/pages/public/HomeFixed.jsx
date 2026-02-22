{/* ===== HERO SECTION CON PORTADA MÁS ARRIBA ===== */}
<section className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden -mt-16 md:-mt-20 lg:-mt-24">
  <div className="absolute inset-0">
    {heroImages.map((image, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img 
          src={image.url} 
          alt={image.nombre} 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log('Error cargando imagen:', image.url);
            e.target.onerror = null;
            e.target.src = '/images/hero1.png';
          }}
        />
      </div>
    ))}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
  </div>

  <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20">
    <ChevronLeft className="h-6 w-6" />
  </button>
  <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20">
    <ChevronRightIcon className="h-6 w-6" />
  </button>

  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
    {heroImages.map((_, index) => (
      <button
        key={index}
        onClick={() => { setCurrentSlide(index); setIsAutoPlay(false); }}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          index === currentSlide ? 'w-6 bg-amber-500' : 'bg-white/50 hover:bg-white'
        }`}
      />
    ))}
  </div>

  <button
    onClick={() => setIsAutoPlay(!isAutoPlay)}
    className="absolute bottom-8 right-8 z-20 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20"
  >
    {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
  </button>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
        Batista Global Service
      </h1>
      <p className="text-xl text-white/80 max-w-2xl mx-auto">
        Tu mejor opción para viajes y envíos en el Caribe
      </p>
    </div>
  </div>
</section>