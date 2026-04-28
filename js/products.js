// ========================================
// 🛒 CARRINHO (GLOBAL)
// ========================================
const CART_KEY = "cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  let cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  showToast("Produto adicionado 🛒");
}

// ========================================
// 🔔 BADGE DO CARRINHO
// ========================================
function updateCartBadge() {
  const badge = document.querySelector(".header__cart-badge");
  const cart = getCart();

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
  }
}

// ========================================
// 📦 PRODUTOS
// ========================================
const products = [
  { id: 1, name: "Fone Bluetooth Premium", price: 299.9, category: "Áudio", rating: 4.5 },
  { id: 2, name: "Smartwatch Fitness", price: 599.9, category: "Wearables", rating: 4.8 },
  { id: 3, name: "Notebook Gamer", price: 4999.9, category: "Computadores", rating: 4.7 },
  { id: 4, name: "Teclado Mecânico RGB", price: 449.9, category: "Periféricos", rating: 4.6 }
];

// ========================================
// 📌 ELEMENTOS
// ========================================
const productsGrid = document.getElementById("productsGrid");
const productsCount = document.getElementById("productsCount");

const searchInput = document.getElementById("searchInput");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const applyPriceBtn = document.getElementById("applyPriceFilter");
const clearBtn = document.getElementById("clearFilters");
const sortSelect = document.getElementById("sortSelect");

const categoryContainer = document.getElementById("categoryFilters");

// 🔥 FILTRO TOGGLE
const toggleBtn = document.getElementById("toggleFilters");
const panel = document.getElementById("filtersPanel");

// ========================================
// 💰 UTIL
// ========================================
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

// ========================================
// 🎨 CARD
// ========================================
function createProductCard(product) {
  return `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <strong>${formatCurrency(product.price)}</strong>

      <button class="btn-add" data-id="${product.id}">
        Comprar
      </button>
    </div>
  `;
}

// ========================================
// 🖼️ RENDER
// ========================================
function renderProducts(list) {
  if (!productsGrid) return;

  productsGrid.innerHTML = list.map(createProductCard).join("");

  if (productsCount) {
    productsCount.textContent = `${list.length} produtos`;
  }
}

// ========================================
// 📂 CATEGORIAS
// ========================================
function renderCategories() {
  if (!categoryContainer) return;

  const categories = [...new Set(products.map(p => p.category))];

  categoryContainer.innerHTML = categories.map(cat => `
    <label>
      <input type="checkbox" value="${cat}" class="category-checkbox">
      ${cat}
    </label>
  `).join("");
}

// ========================================
// 🔍 FILTROS
// ========================================
function applyFilters() {
  let filtered = [...products];

  const search = searchInput?.value.toLowerCase() || "";
  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search)
    );
  }

  const min = parseFloat(minPrice?.value) || 0;
  const max = parseFloat(maxPrice?.value) || Infinity;

  filtered = filtered.filter(p =>
    p.price >= min && p.price <= max
  );

  const selected = [...document.querySelectorAll(".category-checkbox:checked")]
    .map(el => el.value);

  if (selected.length > 0) {
    filtered = filtered.filter(p =>
      selected.includes(p.category)
    );
  }

  switch (sortSelect?.value) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
  }

  renderProducts(filtered);
}

// ========================================
// 🎛️ TOGGLE FILTROS (CORRIGIDO)
// ========================================
function initFilterToggle() {
  if (!toggleBtn || !panel) return;

  function toggleFilters(e) {
    e.stopPropagation(); // 🔥 evita conflito com click global

    const isOpen = panel.classList.contains("active");

    if (isOpen) {
      panel.classList.remove("active");
      panel.classList.add("hidden");
      toggleBtn.classList.remove("active");
    } else {
      panel.classList.remove("hidden");
      panel.classList.add("active");
      toggleBtn.classList.add("active");
    }
  }

  toggleBtn.addEventListener("click", toggleFilters);

  // 🔥 IMPORTANTE: NÃO conflita com botão de comprar
  document.addEventListener("click", (e) => {
    const clickedInsidePanel = panel.contains(e.target);
    const clickedButton = toggleBtn.contains(e.target);

    if (!clickedInsidePanel && !clickedButton) {
      panel.classList.remove("active");
      panel.classList.add("hidden");
      toggleBtn.classList.remove("active");
    }
  });
}

// ========================================
// 🧠 EVENTOS
// ========================================
function initEvents() {
  searchInput?.addEventListener("input", applyFilters);
  applyPriceBtn?.addEventListener("click", applyFilters);
  sortSelect?.addEventListener("change", applyFilters);

  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("category-checkbox")) {
      applyFilters();
    }
  });

  clearBtn?.addEventListener("click", () => {
    searchInput.value = "";
    minPrice.value = "";
    maxPrice.value = "";
    sortSelect.value = "";

    document.querySelectorAll(".category-checkbox")
      .forEach(cb => cb.checked = false);

    renderProducts(products);
  });

  // 🔥 ADD TO CART (sem conflito)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const product = products.find(p => p.id === id);

    if (!product) return;

    addToCart(product);
  });
}

// ========================================
// 🔔 TOAST
// ========================================
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ========================================
// 🚀 INIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  renderCategories();
  initEvents();
  initFilterToggle(); // 🔥 ESSENCIAL
  updateCartBadge();
});