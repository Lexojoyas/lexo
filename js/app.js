(function () {
  const grid = document.getElementById("catalog-grid");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");
  const pillsContainer = document.getElementById("category-pills");

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
          <a class="btn-whatsapp" href="${whatsappLink(product)}" target="_blank" rel="noopener">
            Consultar
          </a>
        </div>
      </div>
    `;
    return card;
  }

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
    if (heroTitle) heroTitle.textContent = STORE_CONFIG.heroTitle;
    if (heroCopy) heroCopy.textContent = STORE_CONFIG.heroCopy;
    if (footerBrand) footerBrand.textContent = STORE_CONFIG.name;
    if (footerLocation) footerLocation.textContent = STORE_CONFIG.footerLocation;
    if (igLink) igLink.href = STORE_CONFIG.instagram;
    if (waLink) waLink.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  }

  searchInput.addEventListener("input", (event) => {
    state.query = normalize(event.target.value.trim());
    render();
  });

  applyStoreConfig();
  buildCategoryPills();
  render();
})();
