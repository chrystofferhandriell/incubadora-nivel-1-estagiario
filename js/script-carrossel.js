// 🔥 PRODUTOS EM OFERTA
const offerProducts = [
  {
    id: 201,
    name: "Headset Gamer RGB 7.1",
    price: 249.9,
    originalPrice: 399.9,
    discount: 38,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
    category: "Periféricos",
    rating: 4.7,
    reviews: 210,
  },
  {
    id: 202,
    name: "Mouse Gamer 16000 DPI",
    price: 179.9,
    originalPrice: 299.9,
    discount: 40,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
    category: "Periféricos",
    rating: 4.6,
    reviews: 320,
  },
  {
    id: 203,
    name: "Teclado Mecânico RGB",
    price: 399.9,
    originalPrice: 599.9,
    discount: 33,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    category: "Periféricos",
    rating: 4.8,
    reviews: 180,
  },
  {
    id: 204,
    name: "Monitor Gamer 24\" 144Hz",
    price: 999.9,
    originalPrice: 1399.9,
    discount: 29,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    category: "Monitores",
    rating: 4.9,
    reviews: 150,
  },
  {
    id: 205,
    name: "Notebook Ultrafino i5",
    price: 3499.9,
    originalPrice: 4499.9,
    discount: 22,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    category: "Computadores",
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 206,
    name: "Smartphone Android 128GB",
    price: 1299.9,
    originalPrice: 1799.9,
    discount: 28,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    category: "Smartphones",
    rating: 4.7,
    reviews: 540,
  },
  {
    id: 207,
    name: "Smart TV 50\" 4K",
    price: 2199.9,
    originalPrice: 2999.9,
    discount: 26,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
    category: "TVs",
    rating: 4.6,
    reviews: 290,
  },
  {
    id: 213,
    name: "Tablet 10\" Android",
    price: 899.9,
    originalPrice: 1299.9,
    discount: 30,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    category: "Tablets",
    rating: 4.5,
    reviews: 180,
  },
  {
    id: 214,
    name: "Fone de Ouvido Bluetooth",
    price: 199.9,
    originalPrice: 349.9,
    discount: 43,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Áudio",
    rating: 4.6,
    reviews: 260,
  },
  
  {
    id: 216,
    name: "Power Bank 20000mAh",
    price: 149.9,
    originalPrice: 249.9,
    discount: 40,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    category: "Acessórios",
    rating: 4.5,
    reviews: 310,
  },
  {
    id: 217,
    name: "Hub USB-C 7 em 1",
    price: 179.9,
    originalPrice: 299.9,
    discount: 40,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500",
    category: "Acessórios",
    rating: 4.6,
    reviews: 190,
  },
  {
    id: 210,
    name: "Roteador Wi-Fi 6",
    price: 499.9,
    originalPrice: 799.9,
    discount: 37,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500",
    category: "Redes",
    rating: 4.7,
    reviews: 198,
  },
  {
    id: 211,
    name: "Webcam Full HD 1080p",
    price: 159.9,
    originalPrice: 249.9,
    discount: 36,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500",
    category: "Acessórios",
    rating: 4.5,
    reviews: 134,
  },
  {
    id: 212,
    name: "SSD 1TB NVMe",
    price: 449.9,
    originalPrice: 699.9,
    discount: 35,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500",
    category: "Hardware",
    rating: 4.9,
    reviews: 220,
  }
];

// ========================================
// CONFIG
// ========================================
const offers = offerProducts;

const track = document.getElementById("offersTrack");
const btnNext = document.querySelector(".carousel__btn.next");
const btnPrev = document.querySelector(".carousel__btn.prev");

let index = 1; // começa no primeiro real
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
// CRIAR CARD
// ========================================
function createCard(p) {
  return `
    <div class="product-card">
      <img src="${p.image}" class="product-card__image" />
      <h3>${p.name}</h3>
      <p>${formatCurrency(p.price)}</p>
      <span style="color:red;">-${p.discount}%</span>
    </div>
  `;
}

// ========================================
// RENDER COM CLONES 🔥
// ========================================
function renderOffers() {
  if (!track) return;

  const firstClone = createCard(offers[0]);
  const lastClone = createCard(offers[offers.length - 1]);

  const items = [
    lastClone, // clone do último
    ...offers.map(createCard),
    firstClone // clone do primeiro
  ];

  track.innerHTML = items.join("");

  // posiciona no primeiro item real
  track.style.transform = `translateX(-${itemWidth}px)`;
}

// ========================================
// MOVIMENTO
// ========================================
function moveToIndex() {
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

// ========================================
// BOTÃO NEXT
// ========================================
btnNext?.addEventListener("click", () => {
  if (isTransitioning) return;

  index++;
  moveToIndex();
  isTransitioning = true;
});

// ========================================
// BOTÃO PREV
// ========================================
btnPrev?.addEventListener("click", () => {
  if (isTransitioning) return;

  index--;
  moveToIndex();
  isTransitioning = true;
});

// ========================================
// LOOP INFINITO (MAGIA 🔥)
// ========================================
track.addEventListener("transitionend", () => {
  isTransitioning = false;

  // chegou no clone do último
  if (index === 0) {
    track.style.transition = "none";
    index = offers.length;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  // chegou no clone do primeiro
  if (index === offers.length + 0) {
    track.style.transition = "none";
    index = 0;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }
});

// ========================================
// AUTO SLIDE (SUAVE)
// ========================================
let autoSlide = setInterval(() => {
  btnNext.click();
}, 2000);

// pausar no hover (UX top 🔥)
track.addEventListener("mouseenter", () => clearInterval(autoSlide));
track.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => btnNext.click(), 2000);
});

// ========================================
// INIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  renderOffers();
});