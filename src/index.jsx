<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
    
    <!-- Meta tags para evitar caché -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    
    <!-- Meta tags para SEO y redes sociales -->
    <meta name="description" content="Batista Global Service - Tu mejor opción para viajes y envíos en el Caribe. Servicios de paquetería, tours, renta de autos, reservas de hoteles, vuelos y visas." />
    <meta name="keywords" content="viajes, envíos, caribe, paquetería, tours, renta de autos, hoteles, vuelos, visas, miami, cuba, méxico, república dominicana" />
    <meta name="author" content="Batista Global Service" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://batistaglobalservice.web.app/" />
    <meta property="og:title" content="Batista Global Service - Viajes y Envíos en el Caribe" />
    <meta property="og:description" content="Tu mejor opción para viajes y envíos en el Caribe. Servicios profesionales y confiables." />
    <meta property="og:image" content="https://batistaglobalservice.web.app/images/og-image.jpg" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://batistaglobalservice.web.app/" />
    <meta property="twitter:title" content="Batista Global Service - Viajes y Envíos en el Caribe" />
    <meta property="twitter:description" content="Tu mejor opción para viajes y envíos en el Caribe. Servicios profesionales y confiables." />
    <meta property="twitter:image" content="https://batistaglobalservice.web.app/images/og-image.jpg" />
    
    <!-- Para que funcione bien en móviles -->
    <meta name="theme-color" content="#f59e0b" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="format-detection" content="telephone=no" />
    
    <!-- Iconos para diferentes dispositivos -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    
    <!-- Fuentes modernas - Inter y Poppins (las mejores para diseño web) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
    <!-- Estilos globales adicionales - TODAS LAS ANIMACIONES Y EFECTOS -->
    <style>
      /* ===== RESET Y ESTILOS BASE ===== */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html {
        scroll-behavior: smooth;
        overflow-x: hidden;
      }
      
      body {
        font-family: 'Inter', 'Poppins', sans-serif;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
        color: #333;
      }
      
      /* ===== PERSONALIZACIÓN DE SCROLLBAR ===== */
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 5px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        border-radius: 5px;
        transition: all 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #d97706, #b45309);
      }
      
      /* ===== SELECCIÓN DE TEXTO PERSONALIZADA ===== */
      ::selection {
        background: #f59e0b;
        color: white;
      }
      
      /* ===== ANIMACIONES PRINCIPALES ===== */
      
      /* Fade In Up */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fadeInUp {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      
      /* Fade In */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .animate-fadeIn {
        animation: fadeIn 1s ease-out forwards;
      }
      
      /* Scale In */
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .animate-scaleIn {
        animation: scaleIn 0.6s ease-out forwards;
      }
      
      /* Slide In Left */
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .animate-slideInLeft {
        animation: slideInLeft 0.6s ease-out forwards;
      }
      
      /* Slide In Right */
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .animate-slideInRight {
        animation: slideInRight 0.6s ease-out forwards;
      }
      
      /* Float Animation */
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(5deg);
        }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-float-slow {
        animation: float 8s ease-in-out infinite;
      }
      
      .animate-float-fast {
        animation: float 4s ease-in-out infinite;
      }
      
      /* Bounce Animation */
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      .animate-bounce {
        animation: bounce 2s ease-in-out infinite;
      }
      
      .animate-bounce-slow {
        animation: bounce 3s ease-in-out infinite;
      }
      
      /* Pulse Animation */
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.05);
        }
      }
      
      .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
      }
      
      .animate-pulse-slow {
        animation: pulse 3s ease-in-out infinite;
      }
      
      /* Pulse Glow Animation */
      @keyframes pulseGlow {
        0%, 100% {
          filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.5));
        }
        50% {
          filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.8));
        }
      }
      
      .animate-pulse-glow {
        animation: pulseGlow 2s ease-in-out infinite;
      }
      
      /* Rotate Animation */
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .animate-rotate {
        animation: rotate 10s linear infinite;
      }
      
      .animate-rotate-slow {
        animation: rotate 15s linear infinite;
      }
      
      /* Shimmer Animation */
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      
      .animate-shimmer {
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,0.2) 50%,
          rgba(255,255,255,0) 100%
        );
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
      
      /* Gradient Shift Animation */
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradientShift 5s ease infinite;
      }
      
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradientShift 3s ease infinite;
      }
      
      /* Neon Glow Animation */
      @keyframes neonGlow {
        0%, 100% {
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #f59e0b, 0 0 20px #f59e0b;
        }
        50% {
          text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #f59e0b, 0 0 40px #f59e0b;
        }
      }
      
      .animate-neon {
        animation: neonGlow 2s ease-in-out infinite;
      }
      
      /* Glitch Effect */
      @keyframes glitch {
        0% {
          text-shadow: 2px 2px 0 #ff6b6b, -2px -2px 0 #4ecdc4;
        }
        25% {
          text-shadow: -2px 2px 0 #ff6b6b, 2px -2px 0 #4ecdc4;
        }
        50% {
          text-shadow: 2px -2px 0 #ff6b6b, -2px 2px 0 #4ecdc4;
        }
        75% {
          text-shadow: -2px -2px 0 #ff6b6b, 2px 2px 0 #4ecdc4;
        }
        100% {
          text-shadow: 2px 2px 0 #ff6b6b, -2px -2px 0 #4ecdc4;
        }
      }
      
      .animate-glitch {
        animation: glitch 0.3s infinite;
      }
      
      /* Reveal Animation */
      @keyframes reveal {
        from {
          clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        }
        to {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
      }
      
      .animate-reveal {
        animation: reveal 1.5s ease-out forwards;
      }
      
      /* ===== CLASES DE RETRASO ===== */
      .delay-100 { animation-delay: 100ms; }
      .delay-200 { animation-delay: 200ms; }
      .delay-300 { animation-delay: 300ms; }
      .delay-400 { animation-delay: 400ms; }
      .delay-500 { animation-delay: 500ms; }
      .delay-600 { animation-delay: 600ms; }
      .delay-700 { animation-delay: 700ms; }
      .delay-800 { animation-delay: 800ms; }
      .delay-900 { animation-delay: 900ms; }
      .delay-1000 { animation-delay: 1000ms; }
      .delay-1200 { animation-delay: 1200ms; }
      .delay-1500 { animation-delay: 1500ms; }
      
      /* ===== EFECTOS DE HOVER ===== */
      .hover-glow:hover {
        filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.5));
        transition: filter 0.3s ease;
      }
      
      .hover-scale:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
      }
      
      .hover-scale-lg:hover {
        transform: scale(1.1);
        transition: transform 0.3s ease;
      }
      
      .hover-lift:hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
      }
      
      .hover-lift-lg:hover {
        transform: translateY(-10px);
        transition: transform 0.3s ease;
      }
      
      .hover-rotate:hover {
        transform: rotate(5deg);
        transition: transform 0.3s ease;
      }
      
      .hover-rotate-lg:hover {
        transform: rotate(10deg);
        transition: transform 0.3s ease;
      }
      
      .hover-border:hover {
        border-color: #f59e0b;
        transition: border-color 0.3s ease;
      }
      
      .hover-shadow:hover {
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        transition: box-shadow 0.3s ease;
      }
      
      .hover-shadow-lg:hover {
        box-shadow: 0 30px 60px rgba(0,0,0,0.2);
        transition: box-shadow 0.3s ease;
      }
      
      /* ===== GLASSMORPHISM ===== */
      .glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .glass-dark {
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }
      
      .glass-amber {
        background: rgba(245, 158, 11, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(245, 158, 11, 0.2);
      }
      
      /* ===== NEUMORPHISM ===== */
      .neumorph {
        background: #e0e0e0;
        box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
      }
      
      .neumorph-dark {
        background: #2d2d2d;
        box-shadow: 20px 20px 60px #262626, -20px -20px 60px #343434;
      }
      
      .neumorph-amber {
        background: #f59e0b;
        box-shadow: 20px 20px 60px #d0860a, -20px -20px 60px #ffb63c;
      }
      
      /* ===== EFECTOS DE TEXTO ===== */
      .text-gradient {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .text-gradient-rainbow {
        background: linear-gradient(90deg, #ff6b6b, #f59e0b, #4ecdc4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 200% 200%;
        animation: gradientShift 3s ease infinite;
      }
      
      .text-shadow {
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      
      .text-shadow-lg {
        text-shadow: 4px 4px 8px rgba(0,0,0,0.4);
      }
      
      .text-shadow-amber {
        text-shadow: 2px 2px 4px rgba(245,158,11,0.3);
      }
      
      .text-neon {
        text-shadow: 
          0 0 5px rgba(245,158,11,0.5),
          0 0 10px rgba(245,158,11,0.5),
          0 0 20px rgba(245,158,11,0.5);
      }
      
      .text-neon-lg {
        text-shadow: 
          0 0 10px rgba(245,158,11,0.7),
          0 0 20px rgba(245,158,11,0.7),
          0 0 30px rgba(245,158,11,0.7);
      }
      
      /* ===== EFECTOS DE BORDE ===== */
      .border-gradient {
        border: 2px solid transparent;
        border-image: linear-gradient(135deg, #f59e0b, #d97706);
        border-image-slice: 1;
      }
      
      .border-gradient-amber {
        border: 2px solid transparent;
        border-image: linear-gradient(135deg, #f59e0b, #d97706);
        border-image-slice: 1;
      }
      
      /* ===== EFECTOS DE FONDO ===== */
      .bg-particles {
        position: relative;
        overflow: hidden;
      }
      
      .bg-particles::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 50%, rgba(245,158,11,0.1) 0%, transparent 50%);
        pointer-events: none;
      }
      
      /* ===== UTILIDADES ===== */
      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      /* ===== MEJORAS TÁCTILES PARA MÓVIL ===== */
      @media (max-width: 768px) {
        html {
          font-size: 14px;
        }
        
        body {
          font-size: 14px;
        }
        
        h1 {
          font-size: 2.5rem !important;
          line-height: 1.2 !important;
        }
        
        h2 {
          font-size: 2rem !important;
          line-height: 1.2 !important;
        }
        
        h3 {
          font-size: 1.5rem !important;
        }
        
        button, a, .clickable {
          min-height: 44px;
          min-width: 44px;
        }
        
        input, select, textarea {
          font-size: 16px !important;
          padding: 12px !important;
        }
      }
      
      /* ===== ANIMACIONES PARA ELEMENTOS ESPECÍFICOS ===== */
      .hero-title {
        animation: fadeInUp 0.8s ease-out, pulseGlow 3s ease-in-out infinite;
      }
      
      .hero-subtitle {
        animation: fadeInUp 0.8s ease-out 0.2s both;
      }
      
      .hero-badge {
        animation: pulse 2s ease-in-out infinite;
      }
      
      .card-hover {
        transition: all 0.3s ease;
      }
      
      .card-hover:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 30px 60px rgba(0,0,0,0.15);
      }
      
      /* ===== EFECTOS DE CARGA ===== */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* ===== PARTÍCULAS ===== */
      .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(245, 158, 11, 0.3);
        border-radius: 50%;
        pointer-events: none;
      }
      
      .particle-large {
        width: 4px;
        height: 4px;
      }
      
      /* ===== EFECTOS DE LUZ ===== */
      .light-effect {
        position: relative;
        overflow: hidden;
      }
      
      .light-effect::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      
      .light-effect:hover::after {
        opacity: 1;
      }
      
      /* ===== ANIMACIONES DE ENTRADA ===== */
      .reveal {
        position: relative;
        opacity: 0;
      }
      
      .reveal.active {
        opacity: 1;
      }
      
      .reveal.active .reveal-item {
        animation: fadeInUp 0.8s ease-out forwards;
      }
    </style>
    
    <title>Batista Global Service - Viajes y Envíos en el Caribe</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
    
    <!-- Script para animaciones al hacer scroll -->
    <script>
      // Detectar cuando los elementos son visibles
      document.addEventListener('DOMContentLoaded', function() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      });
      
      // Crear partículas para fondos animados (opcional)
      function createParticles() {
        const sections = document.querySelectorAll('.bg-particles');
        
        sections.forEach(section => {
          for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${5 + Math.random() * 10}s infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(245, 158, 11, ${0.1 + Math.random() * 0.3})`;
            
            section.appendChild(particle);
          }
        });
      }
      
      // Ejecutar después de que cargue la página
      // Descomentar si quieres partículas en secciones específicas
      // window.addEventListener('load', createParticles);
    </script>
  </body>
</html>