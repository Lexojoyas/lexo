// ============================================================
// CONFIGURACIÓN DE LA TIENDA
// Cambiá estos datos por los reales de tu emprendimiento.
// ============================================================
const STORE_CONFIG = {
  name: "Lexo Joyas",
  tagline: "Anillos, cadenas y pulseras bañados en oro",
  heroTitle: "Joyas para brillar todos los días.",
  heroCopy:
    "Anillos, cadenas y pulseras bañados en oro, pensados para el uso diario a precios accesibles.",
  promoBanner: "🎁 Todas las cadenas vienen con un dije de regalo",

  // Número de WhatsApp con código de país, SIN "+", espacios ni guiones.
  // Ejemplo Argentina (celular): 549 + código de área + número.
  whatsappNumber: "5493516847182",

  instagram: "https://www.instagram.com/lexo.joyas/",
  currency: "$",
  footerLocation: "Córdoba, Argentina",
};

// ============================================================
// PRODUCTOS
// Copiá un bloque { ... } completo para agregar un producto nuevo
// y pegalo dentro de los corchetes, separado por una coma.
//
// Campos:
//   id          identificador único, sin espacios (ej: "anillo-32")
//   name        nombre visible del producto
//   category    categoría; los filtros de arriba se arman solos
//               a partir de las categorías que uses acá
//   price       precio en números, sin puntos ni el símbolo $
//   description texto corto, una oración alcanza
//   image       ruta a la foto dentro de /images
//               (si el archivo todavía no existe, se muestra
//               un ícono automáticamente — podés cargar productos
//               antes de tener las fotos listas)
// ============================================================
const PRODUCTS = [
  // --- Anillos ---
  {
    id: "anillo-32",
    name: "Anillo 32",
    category: "Anillos",
    price: 32000,
    description: "Anillo estilo 32, banda ancha.",
    image: "images/anillo-32.jpg",
  },
  {
    id: "anillo-articulado",
    name: "Anillo articulado",
    category: "Anillos",
    price: 32000,
    description: "Anillo de eslabones articulados.",
    image: "images/anillo-articulado.jpg",
  },
  {
    id: "anillos-rolex",
    name: "Anillos rolex",
    category: "Anillos",
    price: 32000,
    description: "Anillo estilo Rolex.",
    image: "images/anillos-rolex.jpg",
  },

  // --- Cadenas ---
  {
    id: "caracol-fina",
    name: "Caracol fina",
    category: "Cadenas",
    price: 35000,
    description: "Cadena caracol, eslabón fino.",
    image: "images/caracol-fina.jpg",
  },
  {
    id: "caracol-gruesa",
    name: "Caracol gruesa",
    category: "Cadenas",
    price: 35000,
    description: "Cadena caracol, eslabón grueso.",
    image: "images/caracol-gruesa.jpg",
  },
  {
    id: "cubana-gruesa",
    name: "Cubana gruesa",
    category: "Cadenas",
    price: 35000,
    description: "Cadena cubana, eslabón grueso.",
    image: "images/cubana-gruesa.jpg",
  },
  {
    id: "enrollada-fina",
    name: "Enrollada fina",
    category: "Cadenas",
    price: 35000,
    description: "Cadena enrollada, eslabón fino.",
    image: "images/enrollada-fina.jpg",
  },
  {
    id: "gourmet-fina",
    name: "Gourmet fina",
    category: "Cadenas",
    price: 35000,
    description: "Cadena gourmet, eslabón fino.",
    image: "images/gourmet-fina.jpg",
  },
  {
    id: "paris-fina",
    name: "Paris fina",
    category: "Cadenas",
    price: 35000,
    description: "Cadena estilo París, fina.",
    image: "images/paris-fina.jpg",
  },
  {
    id: "rosario-fino",
    name: "Rosario fino",
    category: "Cadenas",
    price: 35000,
    description: "Cadena rosario, eslabón fino.",
    image: "images/rosario-fino.jpg",
  },
  {
    id: "singapur-fina",
    name: "Singapur fina",
    category: "Cadenas",
    price: 35000,
    description: "Cadena singapur, eslabón fino.",
    image: "images/singapur-fina.jpg",
  },
  {
    id: "tourbillon-fina",
    name: "Tourbillon fina",
    category: "Cadenas",
    price: 35000,
    description: "Cadena tourbillon, eslabón fino.",
    image: "images/tourbillon-fina.jpg",
  },
  {
    id: "tourbillon-gruesa",
    name: "Tourbillon gruesa",
    category: "Cadenas",
    price: 35000,
    description: "Cadena tourbillon, eslabón grueso.",
    image: "images/tourbillon-gruesa.jpg",
  },
  {
    id: "trenzada-fina",
    name: "Trenzada fina",
    category: "Cadenas",
    price: 35000,
    description: "Cadena trenzada, eslabón fino.",
    image: "images/trenzada-fina.jpg",
  },
  {
    id: "van-cleef-blanca",
    name: "Van cleef blanca",
    category: "Cadenas",
    price: 35000,
    description: "Cadena estilo Van Cleef, blanca.",
    image: "images/van-cleef-blanca.jpg",
  },
  {
    id: "van-cleef-dorada",
    name: "Van cleef dorada",
    category: "Cadenas",
    price: 35000,
    description: "Cadena estilo Van Cleef, dorada.",
    image: "images/van-cleef-dorada.jpg",
  },
  {
    id: "van-cleef-negra",
    name: "Van cleef negra",
    category: "Cadenas",
    price: 35000,
    description: "Cadena estilo Van Cleef, negra.",
    image: "images/van-cleef-negra.jpg",
  },
  {
    // Nueva: no estaba en el catálogo original, precio en línea con
    // las otras cadenas "fina" ($35.000) — ajustalo si corresponde otro.
    id: "cadena-fina-militar",
    name: "Cadena fina militar",
    category: "Cadenas",
    price: 35000,
    description: "Cadena militar, eslabón fino.",
    image: "images/cadena-fina-militar.jpg",
  },

  // --- Pulseras ---
  {
    id: "pulsera-cubana-ajustable",
    name: "Pulsera cubana ajustable",
    category: "Pulseras",
    price: 19000,
    description: "Pulsera cubana, talle ajustable.",
    image: "images/pulsera-cubana-ajustable.jpg",
  },
  {
    id: "pulsera-figaro",
    name: "Pulsera figaro",
    category: "Pulseras",
    price: 19000,
    description: "Pulsera estilo Figaro.",
    image: "images/pulsera-figaro.jpg",
  },
  {
    id: "pulsera-gourmet",
    name: "Pulsera gourmet",
    category: "Pulseras",
    price: 19000,
    description: "Pulsera estilo gourmet.",
    image: "images/pulsera-gourmet.jpg",
  },
  {
    id: "pulsera-rosario",
    name: "Pulsera rosario",
    category: "Pulseras",
    price: 19000,
    description: "Pulsera estilo rosario.",
    image: "images/pulsera-rosario.jpg",
  },
  {
    id: "pulsera-singapur",
    name: "Pulsera singapur",
    category: "Pulseras",
    price: 19000,
    description: "Pulsera estilo singapur.",
    image: "images/pulsera-singapur.jpg",
  },
  {
    id: "pulsera-tourbillon",
    name: "Pulsera tourbillon",
    category: "Pulseras",
    price: 19000,
    description: "Pulsera estilo tourbillon.",
    image: "images/pulsera-tourbillon.jpg",
  },
  {
    id: "pulsera-van-cleef",
    name: "Pulsera van cleef",
    category: "Pulseras",
    price: 19000,
    description: "Pulsera estilo Van Cleef.",
    image: "images/pulsera-van-cleef.jpg",
  },
  {
    id: "pulsera-van-cleef-dorada",
    name: "Pulsera van cleef dorada",
    category: "Pulseras",
    price: 19000,
    description: "Pulsera estilo Van Cleef, dorada.",
    image: "images/pulsera-van-cleef-dorada.jpg",
  },
];
