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
	{
		id: 5,
		name: "Monitor 27\" 144Hz",
		price: 1299.9,
		originalPrice: 1799.9,
		discount: 28,
		image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
		category: "Monitores",
		rating: 4.9,
		reviews: 95,
	},
	{
		id: 6,
		name: "PlayStation 5",
		price: 4499.9,
		originalPrice: 4999.9,
		discount: 10,
		image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80",
		category: "Games",
		rating: 4.9,
		reviews: 990,
	},
	{
		id: 7,
		name: "Alexa Echo Dot",
		price: 349.9,
		originalPrice: 499.9,
		discount: 30,
		image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80",
		category: "Casa Inteligente",
		rating: 4.8,
		reviews: 600,
	},
];

// ========================================
// ELEMENTOS
// ========================================

const productsGrid = document.getElementById("productsGrid");
const productsCount = document.getElementById("productsCount");

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
// FILTROS
// ========================================

// elementos do HTML
const searchInput = document.getElementById("searchInput");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const applyPriceBtn = document.getElementById("applyPriceFilter");
const clearBtn = document.getElementById("clearFilters");
const sortSelect = document.getElementById("sortSelect");
const categoryContainer = document.getElementById("categoryFilters");

// ========================================
// GERAR CATEGORIAS AUTOMATICAMENTE
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
// FUNÇÃO PRINCIPAL DE FILTRO
// ========================================

function applyFilters() {
	let filtered = [...products];

	// 🔍 BUSCA
	const search = searchInput?.value.toLowerCase() || "";
	if (search) {
		filtered = filtered.filter(p =>
			p.name.toLowerCase().includes(search)
		);
	}

	// 💰 PREÇO
	const min = parseFloat(minPrice?.value) || 0;
	const max = parseFloat(maxPrice?.value) || Infinity;

	filtered = filtered.filter(p =>
		p.price >= min && p.price <= max
	);

	// 🏷️ CATEGORIA
	const selectedCategories = [...document.querySelectorAll(".category-checkbox:checked")]
		.map(el => el.value);

	if (selectedCategories.length > 0) {
		filtered = filtered.filter(p =>
			selectedCategories.includes(p.category)
		);
	}

	const toggleCategoryBtn = document.getElementById("toggleCategoryBtn");
const categoryFilters = document.getElementById("categoryFilters");

// toggle (abre/fecha)
toggleCategoryBtn.addEventListener("click", () => {
	categoryFilters.classList.toggle("hidden");
});

	// 🔃 ORDENAÇÃO
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
		case "rating":
			filtered.sort((a, b) => b.rating - a.rating);
			break;
	}

	renderProducts(filtered);
}

// ========================================
// EVENTOS
// ========================================

function initFilters() {
	// busca em tempo real
	searchInput?.addEventListener("input", applyFilters);

	// botão preço
	applyPriceBtn?.addEventListener("click", applyFilters);

	// ordenação
	sortSelect?.addEventListener("change", applyFilters);

	// categorias
	document.addEventListener("change", (e) => {
		if (e.target.classList.contains("category-checkbox")) {
			applyFilters();
		}
	});

	// limpar filtros
	clearBtn?.addEventListener("click", () => {
		if (searchInput) searchInput.value = "";
		if (minPrice) minPrice.value = "";
		if (maxPrice) maxPrice.value = "";
		if (sortSelect) sortSelect.value = "default";

		document.querySelectorAll(".category-checkbox")
			.forEach(cb => cb.checked = false);

		renderProducts(products);
	});
}

// ========================================
// INICIALIZAÇÃO FINAL
// ========================================

document.addEventListener("DOMContentLoaded", () => {
	renderProducts(products);
	renderCategories(); // 🔥 cria categorias automaticamente
	initFilters();      // 🔥 ativa filtros
});

// ========================================
// RENDER
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
						<span class="product-card__old-price">
							${formatCurrency(product.originalPrice)}
						</span>
					</div>

					<button class="btn btn-primary btn-sm">
						Comprar
					</button>
				</div>
			</div>
		</div>
	`;
}

function renderProducts(list) {
	if (!productsGrid) {
		console.error("Elemento productsGrid não encontrado!");
		return;
	}

	if (list.length === 0) {
		productsGrid.innerHTML = "<p>Nenhum produto encontrado</p>";
		return;
	}

	const html = list.map(createProductCard).join("");
	productsGrid.innerHTML = html;

	if (productsCount) {
		productsCount.textContent = `${list.length} produtos encontrados`;
	}
}



