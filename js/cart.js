// ======================================
// CARRINHO (localStorage)
// ======================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// salvar
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// adicionar produto
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  alert("Produto adicionado ao carrinho!");
}

// remover
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

// atualizar quantidade
function updateQuantity(id, quantity) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity = quantity;
  }
  saveCart();
  renderCart();
}

// total
function getTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// badge do carrinho
function updateCartBadge() {
  const badge = document.querySelector(".header__cart-badge");
  if (!badge) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
}