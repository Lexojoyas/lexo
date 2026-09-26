// ============================================================
// CONFIGURACIÓN DE LA TIENDA
// Cambiá estos datos por los reales de tu emprendimiento.
// ============================================================
const STORE_CONFIG = {
  name: "Lexo Joyas",
  tagline: "Cadenas y pulseras bañadas en oro 18k",
  heroTitle: "Cadenas, pulseras y anillos que brillan todos los días.",
  heroCopy:
    "Cadenas y pulseras bañadas en oro 18k: no manchan, no destiñen y aguantan el uso diario. Envíos a todo el país desde Córdoba, Argentina.",
  promoBanner: "🎁 Todas las cadenas vienen con un dije de regalo",
  // Texto destacado de la sección "Dijes"
  dijesHeadline: "Elegí tu dije GRATIS con la compra de tu cadena 🎁",
  // Cuántos dijes se muestran como adelanto en la página de inicio
  dijesEnInicio: 4,

  // Número de WhatsApp con código de país, SIN "+", espacios ni guiones.
  // Ejemplo Argentina (celular): 549 + código de área + número.
  whatsappNumber: "5493516847182",

  instagram: "https://www.instagram.com/lexo.joyas/",
  currency: "$",
  footerLocation: "Córdoba, Argentina",
};

// ============================================================
// COMBOS
// Cada combo tiene una lista de "items" (lo que incluye) y un
// precio final ya con el descuento aplicado.
// ============================================================
const COMBOS = [
  {
    id: "combo-cadena-pulsera",
    name: "Combo Cadena + Pulsera",
    price: 48000,
    items: ["1 cadena a elección", "1 pulsera a elección", "1 dije de regalo"],
  },
  {
    id: "combo-anillo-cadena-dije",
    name: "Combo Anillo + Cadena 18k + Dije de regalo",
    price: 62000,
    items: [
      "1 anillo niquelado",
      "1 cadena bañada en oro 18k",
      "1 dije de regalo",
    ],
  },
  {
    id: "combo-pulsera-cadena-anillo",
    name: "Combo Pulsera + Cadena + Anillo",
    price: 78000,
    items: [
      "1 pulsera a elección",
      "1 cadena a elección",
      "1 anillo niquelado",
      "1 dije de regalo",
    ],
  },
];

// ============================================================
// MÁS VENDIDOS
// Lista de ids de PRODUCTS que se muestran en la sección
// destacada arriba del catálogo. Para cambiarlos, poné acá los
// ids de los productos que quieras destacar (en el orden que
// quieras que aparezcan).
// ============================================================
const FEATURED_PRODUCT_IDS = ["tourbillon-fina", "pulsera-gourmet", "anillo-versace"];

// ============================================================
// DIJES (vidriera)
// Los dijes se muestran SOLO como catálogo visual: no tienen
// precio, no aparecen en el buscador de productos y no se pueden
// agregar al carrito. Son las opciones de regalo que el cliente
// puede elegir al comprar una cadena.
//
// Tienen su propia página (dijes.html) con todos los modelos, y en
// el inicio se muestra un adelanto con los primeros de la lista
// (la cantidad se cambia en STORE_CONFIG.dijesEnInicio).
//
// Para agregar un dije, copiá un bloque { ... } y cambiá:
//   id     identificador único, sin espacios
//   name   nombre visible del dije
//   type   tipo que se muestra debajo del nombre (siempre "Dijes")
//   image  ruta a la foto dentro de /images
//          (ideal: foto vertical 3:4, por ejemplo 900 x 1200)
// ============================================================
const DIJES = [
  {
    id: "dije-bvlgari",
    name: "Placa Bvlgari",
    type: "Dijes",
    image: "images/dije-bvlgari.jpg",
  },
  {
    id: "dije-cruz-grande",
    name: "Cruz grande",
    type: "Dijes",
    image: "images/dije-cruz-grande.jpg",
  },
  {
    id: "dije-gauchito-gil",
    name: "Gauchito Gil",
    type: "Dijes",
    image: "images/dije-gauchito-gil.jpg",
  },
  {
    id: "dije-san-benito",
    name: "Medalla San Benito",
    type: "Dijes",
    image: "images/dije-san-benito.jpg",
  },
  {
    id: "dije-cruz-guadalupe",
    name: "Cruz Virgen de Guadalupe",
    type: "Dijes",
    image: "images/dije-cruz-guadalupe.jpg",
  },
  {
    id: "dije-ruleta-giratoria",
    name: "Ruleta giratoria",
    type: "Dijes",
    image: "images/dije-ruleta-giratoria.jpg",
  },
  {
    id: "dije-san-benito-grande",
    name: "San Benito grande",
    type: "Dijes",
    image: "images/dije-san-benito-grande.jpg",
  },
  {
    id: "dije-padre-nuestro",
    name: "Placa Padre Nuestro",
    type: "Dijes",
    image: "images/dije-padre-nuestro.jpg",
  },
  {
    id: "dije-medalla-cruz",
    name: "Medalla Cruz Griega",
    type: "Dijes",
    image: "images/dije-medalla-cruz.jpg",
  },
];

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
//   oldPrice    (opcional) precio anterior: se muestra tachado al
//               lado del precio actual. Borrá la línea para sacarlo.
//   stock       (opcional) unidades que quedan. Con 1 muestra
//               "Queda una sola", con 2 a 5 "Quedan X" y con 0
//               "Sin stock" (no se puede agregar al carrito).
//               Borrá la línea si no querés mostrar el stock.
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
    description: "Anillo estilo 32, banda ancha. Niquelado.",
    image: "images/anillo-32.jpg",
  },
  {
    id: "anillo-articulado",
    name: "Anillo articulado",
    category: "Anillos",
    price: 32000,
    description: "Anillo de eslabones articulados, bañado en oro 18k.",
    image: "images/anillo-articulado.jpg",
  },
  {
    id: "anillos-rolex",
    name: "Anillos rolex",
    category: "Anillos",
    price: 32000,
    description: "Anillo estilo Rolex. Niquelado.",
    image: "images/anillos-rolex.jpg",
  },
  {
    id: "anillo-versace",
    name: "Anillo Versace",
    category: "Anillos",
    price: 32000,
    description: "Anillo estilo Versace. Niquelado.",
    image: "images/anillo-versace.jpg",
  },
  {
    id: "anillo-todo-pasa",
    name: "Anillo Todo Pasa",
    category: "Anillos",
    price: 32000,
    description: "Anillo con frase \"Todo pasa\". Niquelado.",
    image: "images/anillo-todo-pasa.jpg",
  },
  {
    // Nuevo: precio igual al del resto de los anillos ($32.000) — ajustalo si corresponde otro.
    id: "anillo-siempre-fue-dios",
    name: "Anillo Siempre Fue Dios",
    category: "Anillos",
    price: 32000,
    description: "Anillo con frase \"Siempre fue Dios\". Niquelado.",
    image: "images/anillo-siempre-fue-dios.jpg",
  },

  // --- Cadenas ---
  {
    id: "caracol-fina",
    name: "Caracol fina",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena caracol, eslabón fino.",
    image: "images/caracol-fina.jpg",
  },
  {
    id: "caracol-gruesa",
    name: "Caracol gruesa",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena caracol, eslabón grueso.",
    image: "images/caracol-gruesa.jpg",
  },
  {
    id: "cubana-gruesa",
    name: "Cubana gruesa",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena cubana, eslabón grueso.",
    image: "images/cubana-gruesa.jpg",
  },
  {
    id: "enrollada-fina",
    name: "Enrollada fina",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena enrollada, eslabón fino.",
    image: "images/enrollada-fina.jpg",
  },
  {
    id: "gourmet-fina",
    name: "Gourmet fina",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena gourmet, eslabón fino.",
    image: "images/gourmet-fina.jpg",
  },
  {
    id: "paris-fina",
    name: "Paris fina",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena estilo París, fina.",
    image: "images/paris-fina.jpg",
  },
  {
    id: "rosario-fino",
    name: "Rosario fino",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Rosario de bolitas con medalla de San Benito y cruz.",
    image: "images/rosario-fino.jpg",
  },
  {
    id: "tourbillon-fina",
    name: "Tourbillon fina",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    stock: 1,
    description: "Cadena tourbillon, eslabón fino.",
    image: "images/tourbillon-fina.jpg",
  },
  {
    id: "trenzada-fina",
    name: "Trenzada fina",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena trenzada, eslabón fino.",
    image: "images/trenzada-fina.jpg",
  },
  {
    id: "van-cleef-blanca",
    name: "Van cleef blanca",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena estilo Van Cleef, blanca.",
    image: "images/van-cleef-blanca.jpg",
  },
  {
    id: "van-cleef-dorada",
    name: "Van cleef dorada",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
    description: "Cadena estilo Van Cleef, dorada.",
    image: "images/van-cleef-dorada.jpg",
  },
  {
    id: "van-cleef-negra",
    name: "Van cleef negra",
    category: "Cadenas",
    price: 35000,
    oldPrice: 38000,
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
    oldPrice: 38000,
    description: "Cadena militar, eslabón fino.",
    image: "images/cadena-fina-militar.jpg",
  },

  // --- Pulseras ---
  {
    id: "pulsera-cubana-ajustable",
    name: "Pulsera cubana ajustable",
    category: "Pulseras",
    price: 19000,
    oldPrice: 23000,
    description: "Pulsera cubana, talle ajustable.",
    image: "images/pulsera-cubana-ajustable.jpg",
  },
  {
    id: "pulsera-figaro",
    name: "Pulsera figaro",
    category: "Pulseras",
    price: 19000,
    oldPrice: 23000,
    description: "Pulsera estilo Figaro.",
    image: "images/pulsera-figaro.jpg",
  },
  {
    id: "pulsera-gourmet",
    name: "Pulsera gourmet",
    category: "Pulseras",
    price: 19000,
    oldPrice: 23000,
    description: "Pulsera estilo gourmet.",
    image: "images/pulsera-gourmet.jpg",
  },
  {
    id: "pulsera-singapur",
    name: "Pulsera singapur",
    category: "Pulseras",
    price: 19000,
    oldPrice: 23000,
    description: "Pulsera estilo singapur.",
    image: "images/pulsera-singapur.jpg",
  },
  {
    id: "pulsera-tourbillon",
    name: "Pulsera tourbillon",
    category: "Pulseras",
    price: 19000,
    oldPrice: 23000,
    description: "Pulsera estilo tourbillon.",
    image: "images/pulsera-tourbillon.jpg",
  },
  {
    id: "pulsera-van-cleef",
    name: "Pulsera van cleef",
    category: "Pulseras",
    price: 19000,
    oldPrice: 23000,
    description: "Pulsera estilo Van Cleef.",
    image: "images/pulsera-van-cleef.jpg",
  },
  {
    id: "pulsera-van-cleef-dorada",
    name: "Pulsera van cleef dorada",
    category: "Pulseras",
    price: 19000,
    oldPrice: 23000,
    description: "Pulsera estilo Van Cleef, dorada.",
    image: "images/pulsera-van-cleef-dorada.jpg",
  },
];
