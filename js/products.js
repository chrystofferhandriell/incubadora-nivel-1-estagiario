// ========================================
// PRODUTOS
// ========================================

const products = [
	{
		id: 1,
		name: "Fone Bluetooth Premium",
		price: 299.9,
		originalPrice: 499.9,
		discount: 40,
		image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
		category: "Áudio",
		rating: 4.5,
		reviews: 128,
	},
	{
		id: 2,
		name: "Smartwatch Fitness",
		price: 599.9,
		originalPrice: 899.9,
		discount: 33,
		image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
		category: "Wearables",
		rating: 4.8,
		reviews: 256,
	},
	{
		id: 3,
		name: "Notebook Gamer",
		price: 4999.9,
		originalPrice: 6999.9,
		discount: 28,
		image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
		category: "Computadores",
		rating: 4.7,
		reviews: 142,
	},
	{
		id: 4,
		name: "Teclado Mecânico RGB",
		price: 449.9,
		originalPrice: 699.9,
		discount: 36,
		image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
		category: "Periféricos",
		rating: 4.6,
		reviews: 203,
	},
];

// ========================================
// ELEMENTOS
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
const toggleCategoryBtn = document.getElementById("toggleCategoryBtn");

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
// RENDER PRODUTOS
// ========================================

function createProductCard(product) {
	return `
		<div class="product-card">
			<div class="product-card__image-wrapper">
				<img src="${product.image}" alt="${product.name}" class="product-card__image"/>

				${
					product.discount
						? `<span class="product-card__badge">-${product.discount}%</span>`
						: ""
				}
			</div>

			<div class="product-card__content">
				<h3 class="product-card__title">${product.name}</h3>
				<p class="product-card__category">${product.category}</p>

				<div class="product-card__rating">
					⭐ ${product.rating} (${product.reviews})
				</div>

				<div class="product-card__footer">
					<div>
						<span class="product-card__price">
							${formatCurrency(product.price)}
						</span>
						${
							product.originalPrice
								? `<span class="product-card__old-price">
									${formatCurrency(product.originalPrice)}
								  </span>`
								: ""
						}
					</div>


				<button class="btn btn-primary" onclick='addToCart(${JSON.stringify(product)})'>
                Comprar
                </button>

				</div>
			</div>
		</div>
	`;
}

function renderProducts(list) {
	if (!productsGrid) return;

	productsGrid.innerHTML = list.map(createProductCard).join("");

	if (productsCount) {
		productsCount.textContent = `${list.length} produtos encontrados`;
	}
}

// ========================================
// CATEGORIAS (FIXO 🔥)
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
// FILTROS
// ========================================

function applyFilters() {
	let filtered = [...products];

	// busca
	const search = searchInput?.value.toLowerCase() || "";
	if (search) {
		filtered = filtered.filter(p =>
			p.name.toLowerCase().includes(search)
		);
	}

	// preço
	const min = parseFloat(minPrice?.value) || 0;
	const max = parseFloat(maxPrice?.value) || Infinity;

	filtered = filtered.filter(p =>
		p.price >= min && p.price <= max
	);

	// categorias
	const selectedCategories = [...document.querySelectorAll(".category-checkbox:checked")]
		.map(el => el.value);

	if (selectedCategories.length > 0) {
		filtered = filtered.filter(p =>
			selectedCategories.includes(p.category)
		);
	}

	// ordenação
	switch (sortSelect?.value) {
		case "price-asc":
			filtered.sort((a, b) => a.price - b.price);
			break;
		case "price-desc":
			filtered.sort((a, b) => b.price - a.price);
			break;
		case "name-asc":
			filtered.sort((a, b) => a.name.localeCompare(b.name));
			break;
		case "name-desc":
			filtered.sort((a, b) => b.name.localeCompare(a.name));
			break;
	}

	renderProducts(filtered);
}

// ========================================
// EVENTOS
// ========================================

function initEvents() {
	// busca
	searchInput?.addEventListener("input", applyFilters);

	// preço
	applyPriceBtn?.addEventListener("click", applyFilters);

	// ordenação
	sortSelect?.addEventListener("change", applyFilters);

	// categorias (delegação)
	document.addEventListener("change", (e) => {
		if (e.target.classList.contains("category-checkbox")) {
			applyFilters();
		}
	});

	// limpar
	clearBtn?.addEventListener("click", () => {
		searchInput.value = "";
		minPrice.value = "";
		maxPrice.value = "";
		sortSelect.value = "default";

		document.querySelectorAll(".category-checkbox")
			.forEach(cb => cb.checked = false);

		renderProducts(products);
	});

	// 🔥 TOGGLE CATEGORIAS (AGORA CORRETO)
	toggleCategoryBtn?.addEventListener("click", () => {
		categoryContainer.classList.toggle("hidden");
	});
}

// ========================================
// INIT
// ========================================

document.addEventListener("DOMContentLoaded", () => {
	renderProducts(products);
	renderCategories();
	initEvents();
});