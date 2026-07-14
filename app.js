/* ==========================================
   Tech Universe Inventory
   app.js (Part 1)
========================================== */

let products = [];
let filteredProducts = [];

// ---------- Load Products ----------
async function loadProducts() {

    const container = document.getElementById("products");

    container.innerHTML = "<h3>Loading mobiles...</h3>";

    try {

        const response = await fetch(API_URL);
        const text = await response.text();

        // Google Visualization JSON
        const json = JSON.parse(
            text.substring(47).slice(0, -2)
        );

        const cols = json.table.cols;
        const rows = json.table.rows;

        products = rows.map(row => {

            let obj = {};

            cols.forEach((col, index) => {

                obj[col.label] =
                    row.c[index] ? row.c[index].v : "";

            });

            return obj;

        });

        filteredProducts = [...products];

        renderProducts(filteredProducts);

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <h3>Unable to load products.</h3>
        `;

    }

}

// ---------- Render Products ----------
function renderProducts(data) {

    const container = document.getElementById("products");

    if (data.length === 0) {

        container.innerHTML = `
            <h3>No mobile found.</h3>
        `;

        return;

    }

    container.innerHTML = "";

    data.forEach(product => {

        const image = product.Image
            ? IMAGE_FOLDER + product.Image
            : DEFAULT_IMAGE;

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <img
                src="${image}"
                alt="${product.Model}"
                loading="lazy">

            <div class="card-body">

                <div class="brand">
                    ${product.Brand}
                </div>

                <div class="model">
                    ${product.Model}
                </div>

                <div class="variant">
                    ${product.RAM} + ${product.Storage}
                </div>

                <div class="price">
                    ${CURRENCY}${product.Price}
                </div>

                <div class="status">
                    ${product.Status}
                </div>

                <button
                    class="btn"
                    onclick="openDetails('${product.ID}')">

                    View Details

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}

// ---------- Open Details ----------
function openDetails(id) {

    window.location.href =
        `details.html?id=${id}`;

}

// ---------- Start ----------
loadProducts();

// ==========================================
// Part 2
// Search + Dynamic Brand Filter
// ==========================================

// Create Brand Buttons
function createBrandFilters() {

    const filterBox = document.getElementById("brandFilter");

    // Unique Brand List
    const brands = [
        "All",
        ...new Set(
            products
                .map(p => p.Brand)
                .filter(Boolean)
                .sort()
        )
    ];

    filterBox.innerHTML = "";

    brands.forEach(brand => {

        const button = document.createElement("button");

        button.textContent = brand;

        if (brand === "All") {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            // Active Button
            document
                .querySelectorAll("#brandFilter button")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            // Filter Products
            if (brand === "All") {
                filteredProducts = [...products];
            } else {
                filteredProducts = products.filter(
                    p => p.Brand === brand
                );
            }

            renderProducts(filteredProducts);

        });

        filterBox.appendChild(button);

    });

}

// Search
function initializeSearch() {

    const search = document.getElementById("search");

    search.addEventListener("input", function () {

        const keyword = this.value
            .trim()
            .toLowerCase();

        filteredProducts = products.filter(product => {

            return (
                (product.Brand || "").toLowerCase().includes(keyword) ||
                (product.Model || "").toLowerCase().includes(keyword) ||
                (product.Processor || "").toLowerCase().includes(keyword) ||
                (product.Colour || "").toLowerCase().includes(keyword)
            );

        });

        renderProducts(filteredProducts);

    });

}
// ==========================================
// Part 3
// Sorting + Image Fallback
// ==========================================

// Sorting
function initializeSorting() {

    const sort = document.getElementById("sortSelect");

    sort.addEventListener("change", function () {

        switch(this.value){

            case "low":

                filteredProducts.sort(
                    (a,b)=>Number(a.Price)-Number(b.Price)
                );

                break;

            case "high":

                filteredProducts.sort(
                    (a,b)=>Number(b.Price)-Number(a.Price)
                );

                break;

            case "az":

                filteredProducts.sort(
                    (a,b)=>a.Model.localeCompare(b.Model)
                );

                break;

            case "za":

                filteredProducts.sort(
                    (a,b)=>b.Model.localeCompare(a.Model)
                );

                break;

            default:

                filteredProducts=[...products];

        }

        renderProducts(filteredProducts);

    });

}

// Image Error
document.addEventListener("error",function(e){

    if(e.target.tagName==="IMG"){

        e.target.src=DEFAULT_IMAGE;

    }

},true);
