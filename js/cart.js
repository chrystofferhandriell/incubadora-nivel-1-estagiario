// ======================================
// CONFIG
// ======================================
const CART_KEY = "cart";

// ======================================
// LOAD
// ======================================
function getCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    return data.map(item => ({
      ...item,
      quantity: item.quantity || item.qty || 1
    }));

  } catch {
    return [];
  }
}

let cart = getCart();

// ======================================
// UTIL
// ======================================
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

// ======================================
// SAVE
// ======================================
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// ======================================
// ADD
// ======================================
function addToCart(product) {
  if (!product || !product.id) return;

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image || "",
      quantity: 1
    });
  }

  saveCart();
  showToast("Produto adicionado ao carrinho 🛒");
}

// ======================================
// REMOVE
// ======================================
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

// ======================================
// UPDATE QTD
// ======================================
function updateQuantity(id, quantity) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }

  item.quantity = quantity;

  saveCart();
  renderCart();
}

// ======================================
// TOTALS
// ======================================
function getSubtotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function calculateShipping(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= 300 ? 0 : 20;
}

function getTotal() {
  const subtotal = getSubtotal();
  return subtotal + calculateShipping(subtotal);
}

// ======================================
// BADGE
// ======================================
function updateCartBadge() {
  const badge = document.querySelector(".header__cart-badge");
  const cartCount = document.getElementById("cartCount");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (badge) {
    badge.style.display = totalItems > 0 ? "flex" : "none";
  }

  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// ======================================
// RENDER
// ======================================
function renderCart() {
  const container = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  const shippingEl = document.getElementById("cartShipping");
  const totalEl = document.getElementById("cartTotal");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Carrinho vazio 🛒</p>";

    if (subtotalEl) subtotalEl.textContent = "R$ 0,00";
    if (shippingEl) shippingEl.textContent = "R$ 0,00";
    if (totalEl) totalEl.textContent = "R$ 0,00";

    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" class="cart-item__image" />

      <div class="cart-item__info">
        <h3>${item.name}</h3>
        <p>${formatCurrency(item.price)}</p>

        <div class="cart-controls">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>

      <div class="cart-item__total">
        <strong>${formatCurrency(item.price * item.quantity)}</strong>
        <button onclick="removeFromCart(${item.id})">Remover</button>
      </div>
    </div>
  `).join("");

  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = getTotal();

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "Grátis" : formatCurrency(shipping);
  if (totalEl) totalEl.textContent = formatCurrency(total);
}

// ======================================
// TOAST
// ======================================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ======================================
// INIT
// ======================================
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCart();
});