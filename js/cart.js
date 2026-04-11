// ======================================
// STORAGE
// ======================================
const CART_KEY = "cart";

let cart = getCart();

// pegar carrinho
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

// salvar carrinho
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// ======================================
// AÇÕES DO CARRINHO
// ======================================

// adicionar produto
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  showToast("Produto adicionado ao carrinho 🛒");
}

// remover produto
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

// atualizar quantidade
function updateQuantity(id, quantity) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  // evita valores inválidos
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }

  item.quantity = quantity;
  saveCart();
  renderCart();
}

// limpar carrinho
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// ======================================
// TOTAL
// ======================================

function getTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
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
// RENDER CARRINHO (PÁGINA)
// ======================================

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("cartTotal");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Carrinho vazio 🛒</p>";
    if (totalElement) totalElement.textContent = "R$ 0,00";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" class="cart-item__img"/>

      <div class="cart-item__info">
        <h3>${item.name}</h3>
        <p>${formatCurrency(item.price)}</p>

        <div class="cart-item__controls">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          
          <span>${item.quantity}</span>

          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>

      <div class="cart-item__actions">
        <strong>${formatCurrency(item.price * item.quantity)}</strong>
        <button onclick="removeFromCart(${item.id})">Remover</button>
      </div>
    </div>
  `).join("");

  if (totalElement) {
    totalElement.textContent = formatCurrency(getTotal());
  }
}

// ======================================
// TOAST (mensagem bonita)
// ======================================

function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

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