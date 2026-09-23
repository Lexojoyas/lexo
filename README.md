# Catálogo — Lexo Joyas

Catálogo de productos listo para publicar en GitHub Pages. No necesita
ningún proceso de instalación ni build: es HTML, CSS y JavaScript plano.

Incluye:
- Buscador por nombre/descripción (sin distinguir mayúsculas ni acentos).
- Filtros por categoría, generados automáticamente según tus productos.
- Botón "Consultar" que abre WhatsApp con un mensaje pre-armado
  mencionando el producto y el precio.
- Reemplazo automático por un ícono cuando todavía no subiste la foto
  de un producto.
- Carrito con fotos, cantidades y pedido final por WhatsApp.
- Sección "Dijes": vidriera de los dijes de regalo (sin precio ni carrito).

## Ver el catálogo en tu computadora

Abrí `index.html` directamente con doble clic. Al no usar ningún
proceso de carga de datos externo, funciona igual abierto desde el
archivo que publicado en internet.

## Publicarlo en GitHub Pages

1. Creá un repositorio nuevo en GitHub (puede ser público o privado,
   GitHub Pages funciona con ambos en cuentas con Pages habilitado).
2. Subí el contenido de esta carpeta a ese repositorio: los archivos
   `index.html`, `css/`, `js/` e `images/` deben quedar en la raíz del
   repo (no dentro de una subcarpeta).
3. En el repositorio, andá a **Settings → Pages**.
4. En "Build and deployment", elegí **Source: Deploy from a branch**,
   rama `main` y carpeta `/ (root)`. Guardá.
5. Esperá uno o dos minutos: GitHub te va a mostrar la URL pública,
   con el formato `https://tu-usuario.github.io/nombre-del-repo/`.

Si los menús de GitHub se ven distintos a esto, el flujo general
(Settings → Pages → elegir rama) se mantiene; podés buscar "GitHub
Pages" en la ayuda de GitHub para ver capturas actualizadas.

## Personalizar tu tienda

Todo lo editable está en **`js/products.js`**, no hace falta tocar el
HTML ni el CSS para cambiar contenido.

### 1. Datos generales de la tienda

Al principio del archivo vas a encontrar `STORE_CONFIG`:

```js
const STORE_CONFIG = {
  name: "Lexo Joyas",
  tagline: "Anillos, aros, cadenas y pulseras bañados en oro",
  heroTitle: "Joyas para brillar todos los días.",
  heroCopy: "Anillos, aros, cadenas y pulseras bañados en oro...",
  whatsappNumber: "5493511234567",
  instagram: "https://instagram.com/tu_usuario",
  currency: "$",
  footerLocation: "Córdoba, Argentina",
};
```

Cambiá cada valor por el real. Para `whatsappNumber` usá el código de
país sin "+", sin espacios ni guiones (por ejemplo, un celular de
Córdoba capital quedaría como `5493511234567`). Podés probar que el
link funcione visitando `https://wa.me/TU-NUMERO` en el navegador.

### 2. Productos

Más abajo está el arreglo `PRODUCTS`. Cada producto es un bloque así:

```js
{
  id: "anillo-32",
  name: "Anillo 32",
  category: "Anillos",
  price: 32000,
  description: "Anillo estilo 32, banda ancha.",
  image: "images/anillo-32.jpg",
},
```

- Para **agregar** un producto, copiá un bloque completo (desde `{`
  hasta `},`) y pegalo dentro de los corchetes, con sus propios datos.
- Para **borrar** un producto, borrá su bloque completo.
- Las categorías (`category`) arman los filtros solas: si escribís una
  categoría nueva, va a aparecer como botón de filtro automáticamente.
- `price` va sin puntos ni el símbolo `$`; el catálogo lo formatea solo.

### 3. Fotos de los productos

Guardá las fotos dentro de la carpeta `images/` con el mismo nombre de
archivo que pusiste en el campo `image` de cada producto. Si todavía
no tenés la foto, no pasa nada: se muestra un ícono de la categoría en
su lugar, así que podés cargar el catálogo completo primero y agregar
fotos reales cuando las tengas.

### 4. Dijes (vidriera de regalos)

Los dijes tienen su propia página, **`dijes.html`**, con todos los
modelos. En el inicio se muestra un adelanto con los
primeros de la lista y un botón para ver todos (la cantidad se cambia
en `STORE_CONFIG`, en `dijesEnInicio`).

Más abajo de `FEATURED_PRODUCT_IDS` está el arreglo `DIJES`. Cada dije
es un bloque así:

```js
{
  id: "dije-san-benito",
  name: "Medalla San Benito",
  type: "Dijes",
  image: "images/dije-san-benito.jpg",
},
```

- `type` es el texto que aparece debajo del nombre; en todos va "Dijes".
- El orden de la lista es el orden en que se muestran.

- Los dijes **no tienen precio**, no aparecen en el buscador ni en los
  filtros y **no se pueden agregar al carrito**: se muestran solo como
  vidriera de las opciones de regalo que vienen con cada cadena.
- Para sumar un dije, copiá un bloque y guardá la foto en `images/`
  (ideal: foto vertical 3:4, por ejemplo 900 x 1200 px).
- El texto destacado de la sección se cambia en `STORE_CONFIG`, en
  `dijesHeadline`. La palabra "GRATIS" se resalta sola en dorado.
- Si dejás `DIJES` vacío, la sección y sus links se ocultan solos.

### 5. Logo

El encabezado y el pie usan `images/logo-circle.png`, una versión
circular del logo original (`images/logo.png`, que queda sin tocar)
centrada y con margen para que no se corte. Si cambiás el logo, generá
una versión cuadrada con fondo negro y el diseño centrado, y guardala
con ese mismo nombre. `images/logo-icon-180.png` es el ícono de la
pestaña del navegador.

### 6. Colores y tipografía

Si más adelante querés ajustar la paleta (por ejemplo si tu marca usa
otros colores), están definidos como variables al principio de
`css/style.css`, en el bloque `:root`. Cambiando esos valores cambia
todo el sitio de forma consistente.

## Estructura del proyecto

```
index.html          página principal
dijes.html          página con todos los dijes de regalo
css/style.css        estilos
js/products.js        ← acá editás tu tienda y tus productos
js/app.js             lógica de búsqueda, filtros y WhatsApp (no hace falta tocarlo)
images/               fotos de productos, dijes y logo
```
