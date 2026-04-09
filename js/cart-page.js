const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

let discount = 0;

// render carrinho
function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Carrinho vazio</p>";
    cartTotalEl.textContent = "R$ 0,00";
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" width="80">

      <div>
        <h3>${item.name}</h3>
        <p>${formatCurrency(item.price)}</p>

        <input type="number" value="${item.quantity}" min="1"
          onchange="updateQuantity(${item.id}, this.value)">
        
        <button onclick="removeFromCart(${item.id})">Remover</button>
      </div>
    </div>
  `).join("");

  updateTotal();
}

// total com desconto
function updateTotal() {
  let total = getTotal();

  const payment = document.getElementById("paymentMethod").value;

  if (payment === "pix") {
    total *= 0.9; // 10% OFF
  }

  total -= discount;

  cartTotalEl.textContent = formatCurrency(total);
}

// cupom
function applyCoupon() {
  const code = document.getElementById("coupon").value;

  if (code === "DESCONTO10") {
    discount = 10;
    document.getElementById("discountValue").textContent = "Cupom aplicado: -R$10";
  } else {
    alert("Cupom inválido");
  }

  updateTotal();
}

// finalizar
function checkout() {
  if (cart.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  alert("Compra finalizada com sucesso! 🚀");

  cart = [];
  saveCart();
  renderCart();
}

// init
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.getElementById("paymentMethod")
    .addEventListener("change", updateTotal);
});