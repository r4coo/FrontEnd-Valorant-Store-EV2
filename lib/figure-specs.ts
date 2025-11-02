import type { ValorantAgent, FigureSpecs } from "@/types/valorant"

export function generateFigureSpecs(agent: ValorantAgent): FigureSpecs {
  const role = agent.role?.displayName || "Agent"
  const name = agent.displayName.toLowerCase()

  const baseSpecs: FigureSpecs = {
    height: "25 cm",
    weight: "450 g",
    material: "PVC Premium",
    joints: "15 puntos",
    accessories: "Base + Armas",
    age: "14+ años",
  }

  // Variaciones según el rol
  switch (role) {
    case "Duelist":
    case "Duelista":
      baseSpecs.height = "26 cm"
      baseSpecs.weight = "480 g"
      baseSpecs.joints = "18 puntos"
      baseSpecs.accessories = "Base + Armas + Efectos"
      break
    case "Controller":
    case "Controlador":
      baseSpecs.height = "24 cm"
      baseSpecs.weight = "420 g"
      baseSpecs.joints = "16 puntos"
      baseSpecs.accessories = "Base + Dispositivos"
      break
    case "Sentinel":
    case "Centinela":
      baseSpecs.height = "25 cm"
      baseSpecs.weight = "460 g"
      baseSpecs.joints = "17 puntos"
      baseSpecs.accessories = "Base + Equipos Defensivos"
      break
    case "Initiator":
    case "Iniciador":
      baseSpecs.height = "25 cm"
      baseSpecs.weight = "440 g"
      baseSpecs.joints = "16 puntos"
      baseSpecs.accessories = "Base + Herramientas de Reconocimiento"
      break
  }

  // Variaciones específicas por personaje
  const characterSpecs: Record<string, Partial<FigureSpecs>> = {
    jett: {
      height: "24 cm",
      weight: "420 g",
      accessories: "Base + Cuchillos + Efectos de Viento",
    },
    sage: {
      height: "25 cm",
      weight: "450 g",
      accessories: "Base + Orbe de Curación + Efectos de Hielo",
    },
    phoenix: {
      height: "26 cm",
      weight: "480 g",
      accessories: "Base + Bola de Fuego + Efectos de Llamas",
    },
    sova: {
      height: "26 cm",
      weight: "470 g",
      accessories: "Base + Arco + Flechas + Dron",
    },
    viper: {
      height: "25 cm",
      weight: "460 g",
      accessories: "Base + Dispositivos de Gas + Efectos Tóxicos",
    },
    cypher: {
      height: "25 cm",
      weight: "450 g",
      accessories: "Base + Cámaras + Cables + Efectos de Vigilancia",
    },
    reyna: {
      height: "25 cm",
      weight: "460 g",
      accessories: "Base + Orbe de Vida + Efectos de Almas",
    },
    killjoy: {
      height: "24 cm",
      weight: "430 g",
      accessories: "Base + Turret + Alarmbot + Nanoswarm",
    },
    breach: {
      height: "27 cm",
      weight: "500 g",
      accessories: "Base + Dispositivos Sísmicos + Efectos de Terremoto",
    },
    omen: {
      height: "26 cm",
      weight: "480 g",
      accessories: "Base + Orbes de Sombra + Efectos de Teletransporte",
    },
    raze: {
      height: "25 cm",
      weight: "470 g",
      accessories: "Base + Granadas + Bot + Efectos Explosivos",
    },
    skye: {
      height: "25 cm",
      weight: "450 g",
      accessories: "Base + Animales Espirituales + Efectos de Naturaleza",
    },
    yoru: {
      height: "26 cm",
      weight: "480 g",
      accessories: "Base + Máscara + Efectos Dimensionales",
    },
    astra: {
      height: "25 cm",
      weight: "460 g",
      accessories: "Base + Estrellas + Efectos Cósmicos",
    },
    "kay/o": {
      height: "26 cm",
      weight: "490 g",
      accessories: "Base + Cuchillo + Efectos de Supresión",
    },
    chamber: {
      height: "26 cm",
      weight: "480 g",
      accessories: "Base + Armas Personalizadas + Efectos de Elegancia",
    },
    neon: {
      height: "25 cm",
      weight: "450 g",
      accessories: "Base + Efectos Eléctricos + Carril de Velocidad",
    },
    fade: {
      height: "25 cm",
      weight: "460 g",
      accessories: "Base + Pesadillas + Efectos de Terror",
    },
    harbor: {
      height: "26 cm",
      weight: "480 g",
      accessories: "Base + Escudo de Agua + Efectos Acuáticos",
    },
    gekko: {
      height: "25 cm",
      weight: "450 g",
      accessories: "Base + Criaturas + Efectos Biológicos",
    },
    deadlock: {
      height: "25 cm",
      weight: "460 g",
      accessories: "Base + Nanofilamentos + Efectos de Contención",
    },
    iso: {
      height: "26 cm",
      weight: "480 g",
      accessories: "Base + Efectos Dimensionales + Escudo de Energía",
    },
    clove: {
      height: "25 cm",
      weight: "450 g",
      accessories: "Base + Efectos de Humo + Regeneración",
    },
  }

  // Aplicar especificaciones específicas del personaje
  for (const [key, specs] of Object.entries(characterSpecs)) {
    if (name.includes(key)) {
      return { ...baseSpecs, ...specs }
    }
  }

  return baseSpecs
}
