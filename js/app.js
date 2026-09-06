(function () {
  const grid = document.getElementById("catalog-grid");
  const combosGrid = document.getElementById("combos-grid");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");
  const pillsContainer = document.getElementById("category-pills");
  const promoBanner = document.getElementById("hero-promo");

  // Carrito
  const cartButton = document.getElementById("cart-button");
  const cartCount = document.getElementById("cart-count");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartClose = document.getElementById("cart-close");
  const cartItemsEl = document.getElementById("cart-items");
  const cartEmptyEl = document.getElementById("cart-empty");
  const cartTotalEl = document.getElementById("cart-total");
  const cartCheckoutEl = document.getElementById("cart-checkout");
  const cartClearEl = document.getElementById("cart-clear");
  let cart = {}; // { productId: qty }

  // Lightbox: agrandar imagen al tocarla
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  let lastFocusedBeforeLightbox = null;

  function openLightbox(src, alt) {
    lastFocusedBeforeLightbox = document.activeElement;
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightboxCaption.textContent = alt || "";
    lightboxOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightboxOverlay.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
    if (lastFocusedBeforeLightbox) lastFocusedBeforeLightbox.focus();
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", (event) => {
    if (event.target === lightboxOverlay) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightboxOverlay.hidden) closeLightbox();
  });

  // Ícono de respaldo por categoría: se muestra mientras no haya
  // una foto real en /images con el nombre que indica products.js.
  const ICONS = {
    Anillos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="15" r="6"/><path d="M9 9l3-4 3 4-3 3-3-3Z"/></svg>`,
    Aros: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="5" r="1.8"/><path d="M12 7v2"/><circle cx="12" cy="15" r="6"/></svg>`,
    Cadenas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 17H7a5 5 0 0 1 0-10h2"/><path d="M15 7h2a5 5 0 0 1 0 10h-2"/><path d="M8 12h8"/></svg>`,
    Pulseras: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="12" cy="12" rx="7" ry="9"/></svg>`,
    default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 9l6-5 6 5-6 10Z"/><path d="M6 9h12"/></svg>`,
  };

  const state = { query: "", category: "Todos" };

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
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

  function renderCombos() {
    if (!combosGrid || typeof COMBOS === "undefined") return;
    combosGrid.innerHTML = "";
    COMBOS.forEach((combo) => {
      const card = document.createElement("article");
      card.className = "combo-card";
      card.innerHTML = `
        <h3 class="combo-name">${combo.name}</h3>
        <ul class="combo-items">
          ${combo.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="combo-footer">
          <span class="combo-price">${formatPrice(combo.price)}</span>
          <a class="btn-whatsapp" href="${whatsappComboLink(combo)}" target="_blank" rel="noopener">
            Quiero este combo
          </a>
        </div>
      `;
      combosGrid.appendChild(card);
    });
  }

  function buildCategoryPills() {
    const categories = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];
    pillsContainer.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pill";
      button.textContent = category;
      button.setAttribute("aria-pressed", String(category === state.category));
      button.addEventListener("click", () => {
        state.category = category;
        [...pillsContainer.children].forEach((pill) =>
          pill.setAttribute("aria-pressed", String(pill.textContent === category))
        );
        render();
      });
      pillsContainer.appendChild(button);
    });
  }

  function matchesFilters(product) {
    const inCategory = state.category === "Todos" || product.category === state.category;
    const haystack = normalize(`${product.name} ${product.description} ${product.category}`);
    const inQuery = state.query === "" || haystack.includes(state.query);
    return inCategory && inQuery;
  }

  function createCard(product) {
    const card = document.createElement("article");
    card.className = "card";
    const icon = ICONS[product.category] || ICONS.default;

    card.innerHTML = `
      <div class="card-image">
        <div class="card-image-fallback">${icon}</div>
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.remove()" />
        <span class="card-category">${product.category}</span>
      </div>
      <div class="card-body">
        <h3 class="card-name">${product.name}</h3>
        <p class="card-desc">${product.description}</p>
        <div class="card-footer">
          <span class="card-price">${formatPrice(product.price)}</span>
          <div class="card-actions">
            <button type="button" class="btn-add-cart" data-id="${product.id}" aria-label="Agregar ${product.name} al carrito">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <a class="btn-whatsapp" href="${whatsappLink(product)}" target="_blank" rel="noopener">
              Consultar
            </a>
          </div>
        </div>
      </div>
    `;
    card.querySelector(".btn-add-cart").addEventListener("click", () => addToCart(product.id));

    const cardImage = card.querySelector(".card-image");
    const cardImg = cardImage.querySelector("img");
    cardImage.setAttribute("role", "button");
    cardImage.setAttribute("tabindex", "0");
    cardImage.setAttribute("aria-label", `Ver ${product.name} en grande`);
    const openThisLightbox = () => {
      // Si la foto todavía no existe (se removió por onerror), no hay nada que agrandar.
      if (!cardImg.isConnected) return;
      openLightbox(cardImg.src, product.name);
    };
    cardImage.addEventListener("click", openThisLightbox);
    cardImage.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openThisLightbox();
      }
    });

    return card;
  }

  // --------------------------------------------------------
  // Carrito
  // --------------------------------------------------------
  function addToCart(productId) {
    cart[productId] = (cart[productId] || 0) + 1;
    renderCart();
    openCart();
  }

  function changeQty(productId, delta) {
    const next = (cart[productId] || 0) + delta;
    if (next <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = next;
    }
    renderCart();
  }

  function clearCart() {
    cart = {};
    renderCart();
  }

  function openCart() {
    cartOverlay.classList.add("is-open");
    cartDrawer.classList.add("is-open");
  }

  function closeCart() {
    cartOverlay.classList.remove("is-open");
    cartDrawer.classList.remove("is-open");
  }

  function cartEntries() {
    return Object.entries(cart)
      .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
      .filter((entry) => entry.product);
  }

  function renderCart() {
    const entries = cartEntries();
    const totalQty = entries.reduce((sum, e) => sum + e.qty, 0);
    const totalPrice = entries.reduce((sum, e) => sum + e.qty * e.product.price, 0);

    cartCount.textContent = String(totalQty);
    cartCount.hidden = totalQty === 0;

    cartItemsEl.innerHTML = "";
    cartEmptyEl.hidden = entries.length > 0;

    entries.forEach(({ product, qty }) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${formatPrice(product.price)}</p>
        </div>
        <div class="cart-item-qty">
          <button type="button" class="qty-btn" data-action="minus" aria-label="Quitar uno">−</button>
          <span>${qty}</span>
          <button type="button" class="qty-btn" data-action="plus" aria-label="Agregar uno">+</button>
        </div>
      `;
      row.querySelector('[data-action="minus"]').addEventListener("click", () => changeQty(product.id, -1));
      row.querySelector('[data-action="plus"]').addEventListener("click", () => changeQty(product.id, 1));
      cartItemsEl.appendChild(row);
    });

    cartTotalEl.textContent = formatPrice(totalPrice);

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
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  cartClearEl.addEventListener("click", clearCart);
  cartCheckoutEl.addEventListener("click", (event) => {
    if (cartCheckoutEl.getAttribute("aria-disabled") === "true") event.preventDefault();
  });

  function render() {
    const visible = PRODUCTS.filter(matchesFilters);
    grid.innerHTML = "";
    if (visible.length === 0) {
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      visible.forEach((product) => grid.appendChild(createCard(product)));
    }
  }

  function applyStoreConfig() {
    document.title = `${STORE_CONFIG.name} — Catálogo`;

    const brandName = document.querySelector(".brand-name");
    const tagline = document.querySelector(".brand-tagline");
    const heroTitle = document.querySelector(".hero h1");
    const heroCopy = document.querySelector(".hero-copy");
    const footerBrand = document.querySelector(".footer-brand");
    const footerLocation = document.querySelector(".footer-location");
    const igLink = document.querySelector(".footer-instagram");
    const waLink = document.querySelector(".footer-whatsapp");

    if (brandName) brandName.textContent = STORE_CONFIG.name;
    if (tagline) tagline.textContent = STORE_CONFIG.tagline;
    if (heroTitle) heroTitle.innerHTML = STORE_CONFIG.heroTitle;
    if (heroCopy) heroCopy.textContent = STORE_CONFIG.heroCopy;
    if (footerBrand) footerBrand.textContent = STORE_CONFIG.name;
    if (footerLocation) footerLocation.textContent = STORE_CONFIG.footerLocation;
    if (igLink) igLink.href = STORE_CONFIG.instagram;
    if (waLink) waLink.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
    if (promoBanner && STORE_CONFIG.promoBanner) promoBanner.textContent = STORE_CONFIG.promoBanner;
  }

  searchInput.addEventListener("input", (event) => {
    state.query = normalize(event.target.value.trim());
    render();
  });

  applyStoreConfig();
  buildCategoryPills();
  render();
  renderCombos();
  renderCart();
})();
