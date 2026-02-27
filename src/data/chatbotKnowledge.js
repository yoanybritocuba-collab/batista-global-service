// src/data/chatbotKnowledge.js
// Sistema de árbol de decisión con combinación de palabras

// ============================================
// 1. DICCIONARIO DE SINÓNIMOS Y PALABRAS CLAVE
// ============================================
export const synonyms = {
  // Saludos
  saludo: ['hola', 'buenos', 'buenas', 'saludos', 'hey', 'hi', 'que tal'],
  
  // Servicios principales
  vuelos: ['vuelo', 'vuelos', 'avión', 'aviones', 'aeropuerto', 'viajar en avion', 'boleto', 'boletos', 'pasaje', 'pasajes'],
  hoteles: ['hotel', 'hoteles', 'alojamiento', 'habitación', 'reserva hotel', 'dormir', 'hospedaje'],
  paquetes: ['paquete', 'paquetes', 'cuba', 'viaje a cuba', 'habana', 'varadero', 'cayo largo'],
  autos: ['auto', 'autos', 'carro', 'carros', 'coche', 'coches', 'rentar', 'alquilar', 'vehículo'],
  tours: ['tour', 'tours', 'excursión', 'excursiones', 'paseo', 'isla saona', 'santo domingo'],
  visas: ['visa', 'visas', 'pasaporte', 'documentos', 'tramite', 'papeles'],
  envios: ['envío', 'envios', 'paquetería', 'carga', 'mandar', 'enviar', 'courier'],
  
  // Contacto
  telefono: ['teléfono', 'telefono', 'llamar', 'whatsapp', 'contacto', 'número', 'celular'],
  email: ['email', 'correo', 'mail', 'electrónico'],
  direccion: ['dirección', 'direccion', 'ubicación', 'donde están', 'oficina'],
  horario: ['horario', 'hora', 'abren', 'cierran', 'atención', 'cuando'],
  
  // Precios
  precio: ['precio', 'precios', 'cuesta', 'costó', 'valor', 'tarifa', 'cuanto', 'cual es el precio'],
  oferta: ['oferta', 'ofertas', 'descuento', 'promoción', 'barato', 'rebaja']
};

// ============================================
// 2. BASE DE CONOCIMIENTO (RESPUESTAS)
// ============================================
export const knowledgeBase = {
  // ===== VUELOS =====
  vuelos: {
    titulo: "✈️ VUELOS DISPONIBLES",
    mensaje: "Estos son nuestros destinos más populares:",
    destinos: [
      { nombre: "Miami", precio: "$350 - $550", info: "Vuelos diarios, 2h 30min" },
      { nombre: "Cancún", precio: "$280 - $450", info: "Playas mexicanas" },
      { nombre: "Punta Cana", precio: "$400 - $600", info: "Todo incluido disponible" },
      { nombre: "La Habana", precio: "$300 - $500", info: "Paquetes especiales" },
      { nombre: "Madrid", precio: "$650 - $900", info: "8h de vuelo" },
      { nombre: "París", precio: "$700 - $950", info: "Conexiones disponibles" }
    ],
    opciones: [
      { texto: "Ver precios a Miami", valor: "miami" },
      { texto: "Ver precios a Cancún", valor: "cancun" },
      { texto: "Ver paquetes todo incluido", valor: "paquetes_vuelo" },
      { texto: "Volver al inicio", valor: "inicio" }
    ]
  },

  // ===== HOTELES =====
  hoteles: {
    titulo: "🏨 HOTELES DISPONIBLES",
    mensaje: "Precios por noche (habitación doble):",
    destinos: [
      { nombre: "Punta Cana", precio: "$120 - $250", info: "Todo incluido +$50" },
      { nombre: "La Habana", precio: "$80 - $150", info: "Incluye desayuno" },
      { nombre: "Cancún", precio: "$100 - $200", info: "Frente a la playa" },
      { nombre: "Miami", precio: "$150 - $300", info: "Zona céntrica" }
    ],
    opciones: [
      { texto: "Ver ofertas todo incluido", valor: "ofertas_hoteles" },
      { texto: "Hoteles en Miami", valor: "miami" },
      { texto: "Volver al inicio", valor: "inicio" }
    ]
  },

  // ===== PAQUETES A CUBA =====
  paquetesCuba: {
    titulo: "🇨🇺 PAQUETES A CUBA",
    mensaje: "Paquetes completos (vuelo + hotel + traslados):",
    destinos: [
      { nombre: "La Habana (3 noches)", precio: "$650", info: "Hotel 4 estrellas" },
      { nombre: "Varadero (4 noches)", precio: "$750", info: "Todo incluido" },
      { nombre: "Holguín (5 noches)", precio: "$850", info: "Playa esmeralda" },
      { nombre: "Cayo Largo (4 noches)", precio: "$780", info: "Paraíso natural" }
    ],
    opciones: [
      { texto: "Ver solo hoteles", valor: "hoteles" },
      { texto: "Ver vuelos a Cuba", valor: "vuelos" },
      { texto: "Volver al inicio", valor: "inicio" }
    ]
  },

  // ===== RENTA DE AUTOS =====
  rentaAutos: {
    titulo: "🚗 RENTA DE AUTOS",
    mensaje: "Precios por día (incluye seguro básico):",
    categorias: [
      { tipo: "Económico (4 personas)", precio: "$40/día", info: "Ahorro de combustible" },
      { tipo: "Intermedio (5 personas)", precio: "$60/día", info: "Aire acondicionado" },
      { tipo: "SUV (7 personas)", precio: "$85/día", info: "4x4 disponible" },
      { tipo: "Lujo (5 personas)", precio: "$120/día", info: "Modelos premium" }
    ],
    disponibleEn: ["Miami", "Cancún", "Punta Cana", "Santo Domingo"],
    opciones: [
      { texto: "Ver disponibilidad en Miami", valor: "miami" },
      { texto: "Volver al inicio", valor: "inicio" }
    ]
  },

  // ===== VISAS =====
  visas: {
    titulo: "🛂 TRÁMITES DE VISAS",
    mensaje: "Precios y tiempos de gestión:",
    destinos: [
      { pais: "Estados Unidos", precio: "$250", tiempo: "5-10 días", incluye: "Asesoría completa" },
      { pais: "Europa (Schengen)", precio: "$200", tiempo: "7-15 días", incluye: "Seguro de viaje" },
      { pais: "República Dominicana", precio: "$120", tiempo: "3-5 días", incluye: "Rápido" },
      { pais: "Pasaporte (1ra vez)", precio: "$85", tiempo: "10 días", incluye: "Cita incluida" }
    ],
    opciones: [
      { texto: "Requisitos visa USA", valor: "visa_usa" },
      { texto: "Volver al inicio", valor: "inicio" }
    ]
  },

  // ===== ENVÍOS =====
  envios: {
    titulo: "📦 ENVÍOS INTERNACIONALES",
    mensaje: "Precios desde Miami a todo el mundo:",
    categorias: [
      { tipo: "Documentos (hasta 1kg)", precio: "$25", tiempo: "3-5 días" },
      { tipo: "Caja pequeña (hasta 5kg)", precio: "$45", tiempo: "4-6 días" },
      { tipo: "Caja mediana (hasta 10kg)", precio: "$75", tiempo: "5-7 días" },
      { tipo: "Caja grande (hasta 20kg)", precio: "$120", tiempo: "7-10 días" }
    ],
    opciones: [
      { texto: "Envíos a Cuba", valor: "cuba" },
      { texto: "Volver al inicio", valor: "inicio" }
    ]
  },

  // ===== CONTACTO =====
  contacto: {
    titulo: "📞 CONTACTO",
    telefono: "+1 (786) 658-3567",
    whatsapp: "wa.me/17866583567",
    email: "batistaglobalservice25@gmail.com",
    direccion: "700 SW 57th Ave, Miami FL",
    horario: "Lun-Vie 9-18 | Sáb 10-16 | Dom 10-14",
    opciones: [
      { texto: "Llamar ahora", valor: "llamar" },
      { texto: "Enviar WhatsApp", valor: "whatsapp" },
      { texto: "Ver ubicación", valor: "mapa" },
      { texto: "Volver al inicio", valor: "inicio" }
    ]
  }
};

// ============================================
// 3. ÁRBOL DE DECISIÓN PRINCIPAL
// ============================================
export const decisionTree = {
  inicio: {
    mensaje: "🌟 ¡Hola! Soy el asistente virtual de **Batista Global Service**.\n\n¿Qué deseas consultar hoy?",
    opciones: [
      { texto: "✈️ Vuelos", valor: "vuelos" },
      { texto: "🏨 Hoteles", valor: "hoteles" },
      { texto: "🇨🇺 Paquetes a Cuba", valor: "paquetesCuba" },
      { texto: "🚗 Renta de Autos", valor: "rentaAutos" },
      { texto: "🛂 Visas", valor: "visas" },
      { texto: "📦 Envíos", valor: "envios" },
      { texto: "📞 Contacto", valor: "contacto" }
    ]
  },
  
  // Nodos del árbol
  vuelos: {
    ...knowledgeBase.vuelos,
    padre: "inicio"
  },
  hoteles: {
    ...knowledgeBase.hoteles,
    padre: "inicio"
  },
  paquetesCuba: {
    ...knowledgeBase.paquetesCuba,
    padre: "inicio"
  },
  rentaAutos: {
    ...knowledgeBase.rentaAutos,
    padre: "inicio"
  },
  visas: {
    ...knowledgeBase.visas,
    padre: "inicio"
  },
  envios: {
    ...knowledgeBase.envios,
    padre: "inicio"
  },
  contacto: {
    ...knowledgeBase.contacto,
    padre: "inicio"
  },
  
  // Nodos secundarios
  miami: {
    titulo: "🌴 MIAMI",
    mensaje: "Información detallada sobre Miami:",
    vuelos: "$350 - $550 (2h 30min)",
    hoteles: "$150 - $300 por noche",
    autos: "Disponible desde $40/día",
    opciones: [
      { texto: "Ver vuelos", valor: "vuelos" },
      { texto: "Ver hoteles", valor: "hoteles" },
      { texto: "Volver atrás", valor: "rentaAutos" },
      { texto: "Inicio", valor: "inicio" }
    ],
    padre: "rentaAutos"
  },
  
  cuba: {
    titulo: "🇨🇺 CUBA",
    mensaje: "Información sobre Cuba:",
    paquetes: "Disponibles desde $650",
    envios: "Documentos $25 | Paquetes desde $45",
    opciones: [
      { texto: "Ver paquetes", valor: "paquetesCuba" },
      { texto: "Ver precios de envíos", valor: "envios" },
      { texto: "Inicio", valor: "inicio" }
    ],
    padre: "envios"
  },
  
  visa_usa: {
    titulo: "🇺🇸 VISA AMERICANA",
    mensaje: "**Requisitos para visa USA:**\n• Pasaporte vigente\n• Formulario DS-160\n• Foto 5x5 cm\n• Cita en embajada\n• Comprobantes económicos\n\n**Nuestro servicio incluye:**\n• Asesoría personalizada\n• Llenado de formularios\n• Preparación para entrevista\n• Precio: $250 (todo incluido)",
    opciones: [
      { texto: "Ver otros trámites", valor: "visas" },
      { texto: "Inicio", valor: "inicio" }
    ],
    padre: "visas"
  },
  
  ofertas_hoteles: {
    titulo: "🎉 OFERTAS EN HOTELES",
    mensaje: "Promociones especiales:",
    promos: [
      "Punta Cana: 3 noches por $299 (todo incluido)",
      "La Habana: 4 noches + desayuno $280",
      "Miami: 20% off en estadías de 5+ noches"
    ],
    opciones: [
      { texto: "Ver hoteles", valor: "hoteles" },
      { texto: "Inicio", valor: "inicio" }
    ],
    padre: "hoteles"
  },
  
  paquetes_vuelo: {
    titulo: "🎁 PAQUETES TODO INCLUIDO",
    mensaje: "Vuelo + Hotel + Traslados:",
    paquetes: [
      "Punta Cana: $650 (3 noches)",
      "Cancún: $580 (3 noches)",
      "La Habana: $500 (3 noches)"
    ],
    opciones: [
      { texto: "Ver solo vuelos", valor: "vuelos" },
      { texto: "Ver hoteles", valor: "hoteles" },
      { texto: "Inicio", valor: "inicio" }
    ],
    padre: "vuelos"
  }
};

// ============================================
// 4. MOTOR DE BÚSQUEDA INTELIGENTE
// ============================================
export const findBestMatch = (userInput) => {
  const input = userInput.toLowerCase().trim();
  
  // 1. Detectar saludo (respuesta rápida)
  if (synonyms.saludo.some(word => input.includes(word))) {
    return { tipo: 'saludo', destino: 'inicio' };
  }
  
  // 2. Buscar por palabras clave
  for (const [key, words] of Object.entries(synonyms)) {
    if (key === 'saludo') continue;
    
    const match = words.some(word => 
      input.includes(word) || 
      word.includes(input) || 
      input.split(' ').some(w => word.includes(w) || w.includes(word))
    );
    
    if (match) {
      // Mapear palabra clave a nodo del árbol
      switch(key) {
        case 'vuelos': return { tipo: 'menu', destino: 'vuelos' };
        case 'hoteles': return { tipo: 'menu', destino: 'hoteles' };
        case 'paquetes': return { tipo: 'menu', destino: 'paquetesCuba' };
        case 'autos': return { tipo: 'menu', destino: 'rentaAutos' };
        case 'tours': return { tipo: 'menu', destino: 'paquetesCuba' };
        case 'visas': return { tipo: 'menu', destino: 'visas' };
        case 'envios': return { tipo: 'menu', destino: 'envios' };
        case 'telefono': 
        case 'email':
        case 'direccion':
        case 'horario': return { tipo: 'menu', destino: 'contacto' };
        case 'precio': return { tipo: 'consulta', destino: 'precios' };
        case 'oferta': return { tipo: 'consulta', destino: 'ofertas' };
      }
    }
  }
  
  // 3. Si no encuentra nada, mostrar menú principal
  return { tipo: 'desconocido', destino: 'inicio' };
};