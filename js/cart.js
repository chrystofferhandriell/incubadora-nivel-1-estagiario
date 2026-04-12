// ======================================
// CONFIG
// ======================================
const CART_KEY = "cart";

// ======================================
// DADOS
// ======================================
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

// ======================================
// UTIL
// ======================================
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// ======================================
// SALVAR
// ======================================
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// ======================================
// ADICIONAR AO CARRINHO
// ======================================
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
}

// ======================================
// REMOVER
// ======================================
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

// ======================================
// ATUALIZAR QUANTIDADE
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
// TOTAL PRODUTOS
// ======================================
function getSubtotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// ======================================
// FRETE
// ======================================
function calculateShipping(subtotal) {
  if (subtotal === 0) return 0;

  if (subtotal >= 300) return 0; // frete grátis
  return 20;
}

// ======================================
// TOTAL FINAL
// ======================================
function getTotal() {
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  return subtotal + shipping;
}

// ======================================
// BADGE
// ======================================
function updateCartBadge() {
  const badge = document.querySelector(".header__cart-badge");
  if (!badge) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "flex" : "none";
}

// ======================================
// RENDER DO CARRINHO
// ======================================
function renderCart() {
  const container = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  const shippingEl = document.getElementById("cartShipping");
  const totalEl = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount"); // 🔥 NOVO

  if (!container) return;

  // 🔥 CONTADOR TOTAL (estilo Amazon)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = `${totalItems} itens`;
  }

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
// INIT
// ======================================
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCart();
});