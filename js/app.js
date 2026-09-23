(function () {
  // --------------------------------------------------------
  // Elementos de la página
  // --------------------------------------------------------
  const grid = document.getElementById("catalog-grid");
  const featuredGrid = document.getElementById("featured-grid");
  const combosGrid = document.getElementById("combos-grid");
  const dijesGrid = document.getElementById("dijes-grid");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");
  const catalogCount = document.getElementById("catalog-count");
  const searchInput = document.getElementById("search-input");
  const pillsContainer = document.getElementById("category-pills");
  const promoBanner = document.getElementById("hero-promo");
  const heroVisual = document.getElementById("hero-visual");
  const siteHeader = document.getElementById("site-header");

  // Carrito
  const cartButton = document.getElementById("cart-button");
  const cartCount = document.getElementById("cart-count");
  const cartHeadingCount = document.getElementById("cart-heading-count");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartClose = document.getElementById("cart-close");
  const cartItemsEl = document.getElementById("cart-items");
  const cartEmptyEl = document.getElementById("cart-empty");
  const cartEmptyCta = document.getElementById("cart-empty-cta");
  const cartFooterEl = document.getElementById("cart-footer");
  const cartGiftNote = document.getElementById("cart-gift-note");
  const cartTotalEl = document.getElementById("cart-total");
  const cartCheckoutEl = document.getElementById("cart-checkout");
  const cartClearEl = document.getElementById("cart-clear");
  const CART_STORAGE_KEY = "lexo-joyas-cart";
  let cart = loadCartFromStorage(); // { productId: qty }

  const HAS_DIJES = typeof DIJES !== "undefined" && Array.isArray(DIJES) && DIJES.length > 0;
  const PAGE = document.body.dataset.page || "inicio"; // "inicio" o "dijes"
  const DIJES_PAGE_URL = "dijes.html";

  function loadCartFromStorage() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      // Si el navegador bloquea localStorage (modo privado, etc.) el carrito
      // simplemente no persiste entre recargas, pero el sitio sigue andando.
    }
  }

  // --------------------------------------------------------
  // Íconos
  // --------------------------------------------------------
  // Ícono de respaldo por categoría: se muestra mientras no haya
  // una foto real en /images con el nombre que indica products.js.
  const ICONS = {
    Anillos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="15" r="6"/><path d="M9 9l3-4 3 4-3 3-3-3Z"/></svg>`,
    Aros: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="5" r="1.8"/><path d="M12 7v2"/><circle cx="12" cy="15" r="6"/></svg>`,
    Cadenas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 17H7a5 5 0 0 1 0-10h2"/><path d="M15 7h2a5 5 0 0 1 0 10h-2"/><path d="M8 12h8"/></svg>`,
    Pulseras: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="12" cy="12" rx="7" ry="9"/></svg>`,
    Dijes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="4" r="1.6"/><path d="M12 5.6V8"/><path d="M12 8l5 6-5 7-5-7 5-6Z"/></svg>`,
    default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 9l6-5 6 5-6 10Z"/><path d="M6 9h12"/></svg>`,
  };

  const UI_ICONS = {
    bagPlus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/><path d="M12 11.5v5M9.5 14h5"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>`,
    gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/></svg>`,
    zoom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.4-1.1L12 2z"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10 9 9.5 7.7 9.3 7.2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4 0-.2-.2-.3-.5-.4z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4 15 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z"/></svg>`,
  };

  // --------------------------------------------------------
  // Utilidades
  // --------------------------------------------------------
  const state = { query: "", category: "Todos" };

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  function formatPrice(value) {
    return `${STORE_CONFIG.currency}${value.toLocaleString("es-AR")}`;
  }

  function whatsappLink(product) {
    const message = `Hola! Quiero consultar por "${product.name}" (${formatPrice(product.price)}).`;
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function whatsappComboLink(combo) {
    const itemsText = combo.items.map((item) => `- ${item}`).join("\n");
    const message = `Hola! Me interesa el "${combo.name}" (${formatPrice(combo.price)}):\n${itemsText}`;
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  // Si la foto no existe, se quita y queda visible el ícono de respaldo.
  function attachImageFallback(img) {
    img.addEventListener("error", () => img.remove(), { once: true });
  }

  // --------------------------------------------------------
  // Animación de entrada al hacer scroll
  // --------------------------------------------------------
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealObserver =
    "IntersectionObserver" in window && !prefersReducedMotion
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        )
      : null;

  function observeReveal(el, index) {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
    if (typeof index === "number") {
      el.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    }
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  }

  // --------------------------------------------------------
  // Lightbox: agrandar imagen al tocarla
  // --------------------------------------------------------
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  let lastFocusedBeforeLightbox = null;

  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxCounter = document.getElementById("lightbox-counter");
  let lightboxGallery = null; // { items: [{ src, alt }], index }

  function showLightboxItem(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = alt || "";
  }

  function updateLightboxGalleryUI() {
    const hasGallery = !!(lightboxGallery && lightboxGallery.items.length > 1);
    if (lightboxPrev) lightboxPrev.hidden = !hasGallery;
    if (lightboxNext) lightboxNext.hidden = !hasGallery;
    if (lightboxCounter) {
      lightboxCounter.hidden = !hasGallery;
      if (hasGallery) {
        lightboxCounter.textContent = `${lightboxGallery.index + 1} / ${lightboxGallery.items.length}`;
      }
    }
  }

  // gallery (opcional): { items: [{ src, alt }], index } para pasar fotos con flechas
  function openLightbox(src, alt, gallery) {
    lastFocusedBeforeLightbox = document.activeElement;
    lightboxGallery = gallery && gallery.items.length > 0 ? gallery : null;
    showLightboxItem(src, alt);
    updateLightboxGalleryUI();
    lightboxOverlay.hidden = false;
    document.body.classList.add("no-scroll");
    lightboxClose.focus();
  }

  function stepLightbox(delta) {
    if (!lightboxGallery || lightboxGallery.items.length < 2) return;
    const total = lightboxGallery.items.length;
    lightboxGallery.index = (lightboxGallery.index + delta + total) % total;
    const item = lightboxGallery.items[lightboxGallery.index];
    showLightboxItem(item.src, item.alt);
    updateLightboxGalleryUI();
  }

  function closeLightbox() {
    lightboxOverlay.hidden = true;
    lightboxImage.src = "";
    lightboxGallery = null;
    if (!cartDrawer.classList.contains("is-open")) document.body.classList.remove("no-scroll");
    if (lastFocusedBeforeLightbox) lastFocusedBeforeLightbox.focus({ preventScroll: true });
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", (event) => {
    if (event.target === lightboxOverlay) closeLightbox();
  });
  if (lightboxPrev) lightboxPrev.addEventListener("click", () => stepLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => stepLightbox(1));

  // Deslizar con el dedo en el celular para pasar de foto
  let touchStartX = null;
  lightboxOverlay.addEventListener("touchstart", (event) => {
    touchStartX = event.touches.length === 1 ? event.touches[0].clientX : null;
  }, { passive: true });
  lightboxOverlay.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) > 45) stepLightbox(dx < 0 ? 1 : -1);
  });

  // Hace que un contenedor con foto abra el lightbox con clic o teclado.
  // getGallery (opcional) devuelve las fotos vecinas para navegar con flechas.
  function makeZoomable(container, img, label, getGallery) {
    const open = () => {
      // Si la foto todavía no existe (se removió por error de carga), no hay nada que agrandar.
      if (!img.isConnected) return;
      const gallery = typeof getGallery === "function" ? getGallery(img) : null;
      openLightbox(img.currentSrc || img.src, label, gallery);
    };
    container.addEventListener("click", open);
    container.addEventListener("keydown", (event) => {
      if (event.target !== container) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  }

  // --------------------------------------------------------
  // Hero: collage con las fotos de los más vendidos
  // --------------------------------------------------------
  function renderHeroVisual() {
    if (!heroVisual) return;
    const ids = typeof FEATURED_PRODUCT_IDS !== "undefined" ? FEATURED_PRODUCT_IDS : [];
    const photos = ids
      .map((id) => PRODUCTS.find((product) => product.id === id))
      .filter(Boolean)
      .slice(0, 3);

    if (photos.length < 3) {
      heroVisual.hidden = true;
      return;
    }

    const [main, a, b] = photos;
    heroVisual.innerHTML = `
      <figure class="hv hv-main"><img src="${main.image}" alt="" /></figure>
      <figure class="hv hv-a"><img src="${a.image}" alt="" /></figure>
      <figure class="hv hv-b"><img src="${b.image}" alt="" /></figure>
      ${HAS_DIJES ? `<div class="hv-badge"><span>🎁</span>Dije de regalo con tu cadena</div>` : ""}
    `;
    heroVisual.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => img.closest("figure").remove(), { once: true });
    });
  }

  // --------------------------------------------------------
  // Combos
  // --------------------------------------------------------
  function renderCombos() {
    if (!combosGrid || typeof COMBOS === "undefined") return;
    combosGrid.innerHTML = "";
    COMBOS.forEach((combo, index) => {
      const card = document.createElement("article");
      card.className = "combo-card";
      const items = combo.items
        .map((item) => {
          const isGift = /dije|regalo/i.test(item);
          return `<li class="${isGift ? "is-gift" : ""}"><span class="combo-check">${isGift ? UI_ICONS.gift : UI_ICONS.check}</span>${item}</li>`;
        })
        .join("");
      card.innerHTML = `
        <div>
          <span class="combo-label">Combo ${String(index + 1).padStart(2, "0")}</span>
          <h3 class="combo-name">${combo.name}</h3>
        </div>
        <ul class="combo-items">${items}</ul>
        <div class="combo-footer">
          <div class="combo-price-row">
            <span class="combo-price-label">Precio del combo</span>
            <span class="combo-price">${formatPrice(combo.price)}</span>
          </div>
          <a class="btn btn-wa" href="${whatsappComboLink(combo)}" target="_blank" rel="noopener">
            ${UI_ICONS.whatsapp} Quiero este combo
          </a>
        </div>
      `;
      combosGrid.appendChild(card);
      observeReveal(card, index);
    });
  }

  // --------------------------------------------------------
  // Dijes: vidriera sin precio y sin botón de carrito
  // --------------------------------------------------------
  // Titular: la palabra "GRATIS" se resalta en dorado.
  function renderDijesHeadline() {
    const headlineEl = document.getElementById("dijes-headline");
    if (!headlineEl) return;
    const headline = STORE_CONFIG.dijesHeadline || headlineEl.textContent;
    headlineEl.textContent = "";
    headline.split(/(GRATIS)/).forEach((part) => {
      if (part === "GRATIS") {
        const strong = document.createElement("strong");
        strong.textContent = part;
        headlineEl.appendChild(strong);
      } else if (part) {
        headlineEl.appendChild(document.createTextNode(part));
      }
    });
  }

  // Galería para el lightbox: las fotos de dijes que están a la vista.
  function dijesGalleryFor(clickedImg) {
    const imgs = [...dijesGrid.querySelectorAll(".dije-card img")];
    return {
      items: imgs.map((img) => ({ src: img.currentSrc || img.src, alt: img.alt })),
      index: Math.max(0, imgs.indexOf(clickedImg)),
    };
  }

  function createDijeCard(dije) {
    const card = document.createElement("figure");
    card.className = "dije-card";
    card.innerHTML = `
      <div class="dije-frame" role="button" tabindex="0" aria-label="Ver ${dije.name} en grande">
        <span class="dije-frame-inner">
          <span class="card-image-fallback">${ICONS.Dijes}<span class="fallback-label">Foto próximamente</span></span>
          <img src="${dije.image}" alt="${dije.name}" loading="lazy" />
        </span>
        <span class="card-zoom" aria-hidden="true">${UI_ICONS.zoom}</span>
      </div>
      <figcaption class="dije-name">${dije.name}${dije.type && PAGE === "dijes" ? `<span class="dije-type">${dije.type}</span>` : ""}</figcaption>
    `;
    const frame = card.querySelector(".dije-frame");
    const img = card.querySelector("img");
    attachImageFallback(img);
    makeZoomable(frame, img, dije.name, dijesGalleryFor);
    return card;
  }

  function hideDijesEverywhere() {
    const section = document.getElementById("dijes");
    if (section) section.hidden = true;
    document.querySelectorAll('a[href="dijes.html"]').forEach((link) => (link.hidden = true));
  }

  // Inicio: adelanto con los primeros dijes y botón a la página completa.
  function renderDijesTeaser() {
    const section = document.getElementById("dijes");
    if (!section || !dijesGrid) return;
    if (!HAS_DIJES) {
      hideDijesEverywhere();
      return;
    }
    renderDijesHeadline();

    const limit = Number(STORE_CONFIG.dijesEnInicio) > 0 ? Number(STORE_CONFIG.dijesEnInicio) : 4;
    dijesGrid.innerHTML = "";
    DIJES.slice(0, limit).forEach((dije, index) => {
      const card = createDijeCard(dije);
      dijesGrid.appendChild(card);
      observeReveal(card, index);
    });

    const verTodos = document.getElementById("dijes-ver-todos");
    if (verTodos) verTodos.textContent = `Ver los ${DIJES.length} dijes`;

    // "Ver cadenas": filtra el catálogo por Cadenas y baja hasta ahí.
    const verCadenas = document.getElementById("dijes-ver-cadenas");
    const hasCadenas = PRODUCTS.some((p) => p.category === "Cadenas");
    if (verCadenas) {
      if (!hasCadenas) {
        verCadenas.hidden = true;
      } else {
        verCadenas.addEventListener("click", () => {
          setCategory("Cadenas");
          document.getElementById("catalogo").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
        });
      }
    }
  }

  // Página de dijes: todos los modelos con filtros por tipo.
  const dijesState = { type: "Todos" };

  function renderDijesPage() {
    if (!dijesGrid) return;
    renderDijesHeadline();

    const total = document.getElementById("dijes-total");
    const count = document.getElementById("dijes-count");
    const pills = document.getElementById("dije-type-pills");
    const waLink = document.getElementById("dijes-whatsapp");

    if (waLink) {
      const msg = "¡Hola! Quería consultar por los dijes de regalo con la cadena.";
      waLink.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }

    if (!HAS_DIJES) {
      dijesGrid.innerHTML = `<p class="empty-state">Muy pronto vas a ver acá los dijes disponibles.</p>`;
      if (total) total.hidden = true;
      if (pills) pills.closest(".catalog-controls").hidden = true;
      return;
    }

    if (total) total.textContent = `${DIJES.length} modelos disponibles`;

    // Filtros por tipo (se arman solos con el campo "type")
    const counts = DIJES.reduce((acc, d) => {
      if (d.type) acc[d.type] = (acc[d.type] || 0) + 1;
      return acc;
    }, {});
    const types = Object.keys(counts);
    if (pills) {
      if (types.length < 2) {
        pills.closest(".catalog-controls").hidden = true;
      } else {
        ["Todos", ...types].forEach((type) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "pill";
          button.dataset.type = type;
          button.innerHTML = `${type} <span class="pill-count">${type === "Todos" ? DIJES.length : counts[type]}</span>`;
          button.setAttribute("aria-pressed", String(type === dijesState.type));
          button.addEventListener("click", () => {
            dijesState.type = type;
            [...pills.children].forEach((pill) =>
              pill.setAttribute("aria-pressed", String(pill.dataset.type === type))
            );
            drawGrid();
          });
          pills.appendChild(button);
        });
      }
    }

    function drawGrid() {
      const visible = DIJES.filter((d) => dijesState.type === "Todos" || d.type === dijesState.type);
      dijesGrid.innerHTML = "";
      visible.forEach((dije, index) => {
        const card = createDijeCard(dije);
        dijesGrid.appendChild(card);
        observeReveal(card, index);
      });
      if (count) {
        const label = visible.length === 1 ? "1 modelo" : `${visible.length} modelos`;
        count.textContent = dijesState.type === "Todos" ? label : `${label} · ${dijesState.type}`;
      }
    }

    drawGrid();
  }

  // --------------------------------------------------------
  // Catálogo: filtros, buscador y tarjetas
  // --------------------------------------------------------
  function buildCategoryPills() {
    if (!pillsContainer) return;
    const counts = PRODUCTS.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const categories = ["Todos", ...Object.keys(counts)];
    pillsContainer.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pill";
      button.dataset.category = category;
      const count = category === "Todos" ? PRODUCTS.length : counts[category];
      button.innerHTML = `${category} <span class="pill-count">${count}</span>`;
      button.setAttribute("aria-pressed", String(category === state.category));
      button.addEventListener("click", () => setCategory(category));
      pillsContainer.appendChild(button);
    });
  }

  function setCategory(category) {
    if (!pillsContainer) return;
    state.category = category;
    [...pillsContainer.children].forEach((pill) => {
      const active = pill.dataset.category === category;
      pill.setAttribute("aria-pressed", String(active));
      // En celular los filtros se deslizan de costado: dejamos visible el activo.
      if (active) {
        const left = pill.offsetLeft - pillsContainer.offsetLeft - 16;
        pillsContainer.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      }
    });
    render();
  }

  function resetFilters() {
    searchInput.value = "";
    state.query = "";
    setCategory("Todos");
  }

  function matchesFilters(product) {
    const inCategory = state.category === "Todos" || product.category === state.category;
    const haystack = normalize(`${product.name} ${product.description} ${product.category}`);
    const inQuery = state.query === "" || haystack.includes(state.query);
    return inCategory && inQuery;
  }

  function createCard(product, options = {}) {
    const card = document.createElement("article");
    card.className = "card";
    const icon = ICONS[product.category] || ICONS.default;

    card.innerHTML = `
      <div class="card-image" role="button" tabindex="0" aria-label="Ver ${product.name} en grande">
        <div class="card-image-fallback">${icon}<span class="fallback-label">Foto próximamente</span></div>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <span class="card-tag">${product.category}</span>
        <span class="card-zoom" aria-hidden="true">${UI_ICONS.zoom}</span>
        ${options.featured ? `<span class="card-top-badge">${UI_ICONS.star} Top</span>` : ""}
      </div>
      <div class="card-body">
        <h3 class="card-name">${product.name}</h3>
        <p class="card-desc">${product.description}</p>
        <div class="card-bottom">
          <span class="card-price">${formatPrice(product.price)}</span>
          <div class="card-actions">
            <button type="button" class="btn-add" data-id="${product.id}" aria-label="Agregar ${product.name} al carrito">
              ${UI_ICONS.bagPlus}<span>Agregar</span>
            </button>
            <a class="btn-wa-icon" href="${whatsappLink(product)}" target="_blank" rel="noopener"
               aria-label="Consultar ${product.name} por WhatsApp" title="Consultar por WhatsApp">
              ${UI_ICONS.whatsapp}
            </a>
          </div>
        </div>
      </div>
    `;

    const addButton = card.querySelector(".btn-add");
    addButton.addEventListener("click", (event) => {
      event.stopPropagation();
      addToCart(product.id);
      showAddedFeedback(addButton);
    });

    const cardImage = card.querySelector(".card-image");
    const cardImg = cardImage.querySelector("img");
    attachImageFallback(cardImg);
    makeZoomable(cardImage, cardImg, product.name);

    return card;
  }

  function showAddedFeedback(button) {
    const label = button.querySelector("span");
    if (!label) return;
    clearTimeout(button._addedTimer);
    button.classList.add("is-added");
    label.textContent = "Agregado";
    button._addedTimer = setTimeout(() => {
      button.classList.remove("is-added");
      label.textContent = "Agregar";
    }, 1400);
  }

  function renderFeatured() {
    const section = document.getElementById("destacados");
    if (!section) return;
    if (!featuredGrid || typeof FEATURED_PRODUCT_IDS === "undefined") {
      if (section) section.hidden = true;
      return;
    }
    const featuredProducts = FEATURED_PRODUCT_IDS.map((id) =>
      PRODUCTS.find((product) => product.id === id)
    ).filter(Boolean);

    if (featuredProducts.length === 0) {
      if (section) section.hidden = true;
      return;
    }

    featuredGrid.innerHTML = "";
    featuredProducts.forEach((product, index) => {
      const card = createCard(product, { featured: true });
      featuredGrid.appendChild(card);
      observeReveal(card, index);
    });
  }

  function render() {
    if (!grid) return;
    const visible = PRODUCTS.filter(matchesFilters);
    grid.innerHTML = "";
    if (visible.length === 0) {
      emptyState.hidden = false;
      catalogCount.textContent = "";
    } else {
      emptyState.hidden = true;
      catalogCount.textContent =
        visible.length === 1 ? "1 producto" : `${visible.length} productos`;
      visible.forEach((product, index) => {
        const card = createCard(product);
        grid.appendChild(card);
        observeReveal(card, index);
      });
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.query = normalize(event.target.value.trim());
      render();
    });
  }

  if (emptyReset) emptyReset.addEventListener("click", resetFilters);

  // --------------------------------------------------------
  // Carrito
  // (los dijes nunca entran acá: solo se aceptan ids de PRODUCTS)
  // --------------------------------------------------------
  function addToCart(productId) {
    if (!PRODUCTS.some((p) => p.id === productId)) return;
    cart[productId] = (cart[productId] || 0) + 1;
    saveCartToStorage();
    renderCart();
    bumpCartCount();
    openCart();
  }

  function changeQty(productId, delta) {
    const next = (cart[productId] || 0) + delta;
    if (next <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = next;
    }
    saveCartToStorage();
    renderCart();
  }

  function removeFromCart(productId) {
    delete cart[productId];
    saveCartToStorage();
    renderCart();
  }

  function clearCart() {
    cart = {};
    saveCartToStorage();
    renderCart();
  }

  function bumpCartCount() {
    cartCount.classList.remove("is-bumping");
    // Fuerza reflow para poder repetir la animación
    void cartCount.offsetWidth;
    cartCount.classList.add("is-bumping");
  }

  let lastFocusedBeforeCart = null;

  function openCart() {
    if (cartDrawer.classList.contains("is-open")) return;
    lastFocusedBeforeCart = document.activeElement;
    cartOverlay.classList.add("is-open");
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll", "cart-open");
    setTimeout(() => cartClose.focus({ preventScroll: true }), 50);
  }

  function closeCart(options = {}) {
    if (!cartDrawer.classList.contains("is-open")) return;
    cartOverlay.classList.remove("is-open");
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll", "cart-open");
    if (options.restoreFocus !== false && lastFocusedBeforeCart) {
      lastFocusedBeforeCart.focus({ preventScroll: true });
    }
  }

  function cartEntries() {
    return Object.entries(cart)
      .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
      .filter((entry) => entry.product);
  }

  function renderGiftNote(entries) {
    if (!cartGiftNote) return;
    if (!HAS_DIJES || entries.length === 0) {
      cartGiftNote.hidden = true;
      return;
    }
    const cadenas = entries
      .filter((e) => e.product.category === "Cadenas")
      .reduce((sum, e) => sum + e.qty, 0);

    const dijesHref = PAGE === "dijes" ? "#galeria" : DIJES_PAGE_URL;
    cartGiftNote.innerHTML =
      cadenas > 0
        ? `🎁 ${cadenas === 1 ? "Tu cadena incluye un dije de regalo." : `Tus ${cadenas} cadenas incluyen un dije de regalo cada una.`} <a href="${dijesHref}">Ver dijes</a>`
        : `🎁 Sumá una cadena y llevate un dije de regalo. <a href="${dijesHref}">Ver dijes</a>`;
    cartGiftNote.hidden = false;
  }

  function renderCart() {
    const entries = cartEntries();
    const totalQty = entries.reduce((sum, e) => sum + e.qty, 0);
    const totalPrice = entries.reduce((sum, e) => sum + e.qty * e.product.price, 0);

    cartCount.textContent = String(totalQty);
    cartCount.hidden = totalQty === 0;
    cartButton.setAttribute(
      "aria-label",
      totalQty === 0 ? "Ver carrito" : `Ver carrito (${totalQty} ${totalQty === 1 ? "producto" : "productos"})`
    );
    cartHeadingCount.textContent = totalQty > 0 ? `(${totalQty})` : "";

    cartItemsEl.innerHTML = "";
    cartEmptyEl.hidden = entries.length > 0;
    cartFooterEl.hidden = entries.length === 0;

    entries.forEach(({ product, qty }) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      const icon = ICONS[product.category] || ICONS.default;
      row.innerHTML = `
        <div class="cart-item-thumb">
          ${icon}
          <img src="${product.image}" alt="" loading="lazy" />
        </div>
        <div class="cart-item-main">
          <div class="cart-item-top">
            <div>
              <p class="cart-item-name">${product.name}</p>
              <p class="cart-item-price">${formatPrice(product.price)} c/u</p>
            </div>
            <button type="button" class="cart-item-remove" data-action="remove" aria-label="Quitar ${product.name} del carrito">
              ${UI_ICONS.trash}
            </button>
          </div>
          <div class="cart-item-bottom">
            <div class="cart-item-qty">
              <button type="button" class="qty-btn" data-action="minus" aria-label="Quitar uno">−</button>
              <span aria-live="polite">${qty}</span>
              <button type="button" class="qty-btn" data-action="plus" aria-label="Agregar uno">+</button>
            </div>
            <span class="cart-item-subtotal">${formatPrice(product.price * qty)}</span>
          </div>
        </div>
      `;
      attachImageFallback(row.querySelector("img"));
      row.querySelector('[data-action="minus"]').addEventListener("click", () => changeQty(product.id, -1));
      row.querySelector('[data-action="plus"]').addEventListener("click", () => changeQty(product.id, 1));
      row.querySelector('[data-action="remove"]').addEventListener("click", () => removeFromCart(product.id));
      cartItemsEl.appendChild(row);
    });

    cartTotalEl.textContent = formatPrice(totalPrice);
    renderGiftNote(entries);

    if (entries.length === 0) {
      cartCheckoutEl.setAttribute("aria-disabled", "true");
      cartCheckoutEl.href = "#";
    } else {
      cartCheckoutEl.removeAttribute("aria-disabled");
      const lines = entries.map(
        (e) => `• ${e.qty}x ${e.product.name} (${formatPrice(e.product.price * e.qty)})`
      );
      const message = [
        "¡Hola! Quiero hacer este pedido:",
        "",
        ...lines,
        "",
        `Total: ${formatPrice(totalPrice)}`,
      ].join("\n");
      cartCheckoutEl.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    }
  }

  cartButton.addEventListener("click", openCart);
  cartClose.addEventListener("click", () => closeCart());
  cartOverlay.addEventListener("click", () => closeCart());
  cartClearEl.addEventListener("click", clearCart);
  cartCheckoutEl.addEventListener("click", (event) => {
    if (cartCheckoutEl.getAttribute("aria-disabled") === "true") event.preventDefault();
  });

  // Links dentro del carrito que llevan a otra sección: cierran el carrito primero.
  cartDrawer.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link || link === cartCheckoutEl) return;
    closeCart({ restoreFocus: false });
  });
  if (cartEmptyCta) cartEmptyCta.addEventListener("click", () => closeCart({ restoreFocus: false }));

  // Tecla Escape: cierra primero la imagen ampliada y después el carrito.
  document.addEventListener("keydown", (event) => {
    if (!lightboxOverlay.hidden && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      stepLightbox(event.key === "ArrowRight" ? 1 : -1);
      return;
    }
    if (event.key !== "Escape") return;
    if (!lightboxOverlay.hidden) {
      closeLightbox();
    } else if (cartDrawer.classList.contains("is-open")) {
      closeCart();
    }
  });

  // --------------------------------------------------------
  // Datos generales de la tienda
  // --------------------------------------------------------
  function applyStoreConfig() {
    document.title = PAGE === "dijes" ? `Dijes — ${STORE_CONFIG.name}` : `${STORE_CONFIG.name} — Catálogo`;

    const brandName = document.querySelector(".brand-name");
    const tagline = document.querySelector(".brand-tagline");
    const heroTitle = document.querySelector(".hero h1");
    const heroCopy = document.querySelector(".hero-copy");
    const footerBrand = document.querySelector(".footer-brand");
    const footerLocation = document.querySelector(".footer-location");
    const igLink = document.querySelector(".footer-instagram");
    const waLink = document.querySelector(".footer-whatsapp");
    const waFloat = document.getElementById("whatsapp-float");
    const year = document.getElementById("footer-year");

    if (brandName) brandName.textContent = STORE_CONFIG.name;
    if (tagline) tagline.textContent = STORE_CONFIG.tagline;
    if (heroTitle) heroTitle.innerHTML = STORE_CONFIG.heroTitle;
    if (heroCopy) heroCopy.textContent = STORE_CONFIG.heroCopy;
    if (footerBrand) footerBrand.textContent = STORE_CONFIG.name;
    if (footerLocation) footerLocation.textContent = STORE_CONFIG.footerLocation;
    if (igLink) igLink.href = STORE_CONFIG.instagram;
    if (waLink) waLink.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
    if (waFloat) {
      const floatMessage = "¡Hola! Quería hacer una consulta sobre sus productos.";
      waFloat.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(floatMessage)}`;
    }
    if (promoBanner) {
      promoBanner.textContent = STORE_CONFIG.promoBanner || "";
      if (!HAS_DIJES) promoBanner.removeAttribute("href");
    }
    if (year) year.textContent = String(new Date().getFullYear());
  }

  // Encabezado: se vuelve más sólido al bajar
  function updateHeaderOnScroll() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

  // Si se llega con ?categoria=Cadenas (por ejemplo desde la página de dijes),
  // el catálogo arranca filtrado por esa categoría.
  function applyCategoryFromUrl() {
    if (!pillsContainer) return;
    let wanted = null;
    try {
      wanted = new URLSearchParams(window.location.search).get("categoria");
    } catch (error) {
      wanted = null;
    }
    if (!wanted) return;
    const match = [...new Set(PRODUCTS.map((p) => p.category))].find(
      (c) => normalize(c) === normalize(wanted)
    );
    if (match) setCategory(match);
  }

  // --------------------------------------------------------
  // Inicio
  // --------------------------------------------------------
  applyStoreConfig();
  if (PAGE === "dijes") {
    renderDijesPage();
  } else {
    renderHeroVisual();
    buildCategoryPills();
    render();
    renderFeatured();
    renderCombos();
    renderDijesTeaser();
    applyCategoryFromUrl();
  }
  renderCart();
  updateHeaderOnScroll();
  document.querySelectorAll(".reveal:not(.card):not(.combo-card):not(.dije-card)").forEach((el) => observeReveal(el));

  // Al llegar con un #ancla desde otra página, re-ubicamos la vista
  // una vez que todo el contenido ya está dibujado.
  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "auto" }));
  }
})();
