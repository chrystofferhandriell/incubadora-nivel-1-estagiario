// ========================================
// 🔥 PRODUTOS
// ========================================
const offerProducts = [
  {
    id: 201,
    name: "Headset Gamer RGB 7.1",
    price: 249.9,
    discount: 38,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
  },
  {
    id: 202,
    name: "Mouse Gamer 16000 DPI",
    price: 179.9,
    discount: 40,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
  },
  {
    id: 203,
    name: "Teclado Mecânico RGB",
    price: 399.9,
    discount: 33,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
  }
];

// ========================================
// CONFIG CARROSSEL
// ========================================
const track = document.getElementById("offersTrack");
const btnNext = document.querySelector(".carousel__btn.next");
const btnPrev = document.querySelector(".carousel__btn.prev");

let index = 1;
const itemWidth = 270;
let isTransitioning = false;

// ========================================
// UTIL
// ========================================
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// ========================================
// CARD PRODUTO
// ========================================
function createCard(p) {
  return `
    <div class="product-card">
      <img src="${p.image}" class="product-card__image" />

      <h3>${p.name}</h3>

      <p>${formatCurrency(p.price)}</p>

      <span class="discount">-${p.discount}%</span>

      <button class="btn btn-primary add-to-cart" data-id="${p.id}">
        Comprar
      </button>
    </div>
  `;
}

// ========================================
// RENDER CARROSSEL
// ========================================
function renderOffers() {
  if (!track) return;

  const items = [
    createCard(offerProducts[offerProducts.length - 1]),
    ...offerProducts.map(createCard),
    createCard(offerProducts[0])
  ];

  track.innerHTML = items.join("");
  track.style.transform = `translateX(-${itemWidth}px)`;
}

// ========================================
// MOVIMENTO
// ========================================
function moveToIndex() {
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

btnNext?.addEventListener("click", () => {
  if (isTransitioning) return;
  index++;
  moveToIndex();
  isTransitioning = true;
});

btnPrev?.addEventListener("click", () => {
  if (isTransitioning) return;
  index--;
  moveToIndex();
  isTransitioning = true;
});

// LOOP INFINITO
track?.addEventListener("transitionend", () => {
  isTransitioning = false;

  if (index === 0) {
    track.style.transition = "none";
    index = offerProducts.length;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  if (index === offerProducts.length + 1) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${itemWidth}px)`;
  }
});

// AUTO SLIDE
let autoSlide = setInterval(() => btnNext?.click(), 3000);

track?.addEventListener("mouseenter", () => clearInterval(autoSlide));
track?.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => btnNext?.click(), 3000);
});

// ========================================
// 🔥 INTEGRAÇÃO COM CARRINHO EXISTENTE
// ========================================

// ⚠️ IMPORTANTE: usa o addToCart(product) do seu segundo script
track?.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const product = offerProducts.find(p => p.id === id);

  if (!product) {
    console.error("Produto não encontrado:", id);
    return;
  }

  // 🔥 ENVIA NO FORMATO CERTO (compatível com seu carrinho)
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1 // 👈 PADRÃO CORRETO
  });

  // opcional: feedback visual
  btn.innerText = "Adicionado!";
  setTimeout(() => (btn.innerText = "Comprar"), 1000);
});

// ========================================
// INIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  renderOffers();
});