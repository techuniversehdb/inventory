const mobileContainer = document.getElementById("mobileContainer");
const searchBox = document.getElementById("searchBox");
const brandFilter = document.getElementById("brandFilter");
const sortPrice = document.getElementById("sortPrice");

let mobiles = [];

// Load data from Google Sheets API
async function loadMobiles() {
    mobileContainer.innerHTML =
        '<div class="loading">Loading mobiles...</div>';

    try {
        const response = await fetch(API_URL);
        mobiles = await response.json();

        displayMobiles(mobiles);

    } catch (error) {
        console.error(error);

        mobileContainer.innerHTML = `
            <div class="alert alert-danger">
                Failed to load mobile data.
            </div>
        `;
    }
}

// Display cards
function displayMobiles(data) {

    mobileContainer.innerHTML = "";

    if (data.length === 0) {
        mobileContainer.innerHTML = `
            <div class="alert alert-warning">
                No mobiles found.
            </div>
        `;
        return;
    }

    data.forEach(phone => {

        const available =
            phone.Available?.toLowerCase() === "yes";

        const badge = available
            ? `<span class="badge bg-success stock">Available</span>`
            : `<span class="badge bg-danger stock">Out Of Stock</span>`;

        const card = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

                <div class="card mobile-card">

                    <img
                        src="${phone.Image}"
                        alt="${phone.Model}"
                        onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">

                    <div class="card-body">

                        <h5 class="fw-bold">
                            ${phone.Brand} ${phone.Model}
                        </h5>

                        <div class="price mb-3">
                            ₹${Number(phone.Price).toLocaleString("en-IN")}
                        </div>

                        <div class="spec">
                            <strong>RAM:</strong> ${phone.RAM}
                        </div>

                        <div class="spec">
                            <strong>Storage:</strong> ${phone.Storage}
                        </div>

                        <div class="spec">
                            <strong>Camera:</strong> ${phone.Camera}
                        </div>

                        <div class="spec">
                            <strong>Battery:</strong> ${phone.Battery}
                        </div>

                        <div class="spec">
                            <strong>Display:</strong> ${phone.Display}
                        </div>

                        <div class="spec">
                            <strong>Processor:</strong> ${phone.Processor}
                        </div>

                        <div class="mt-3">
                            ${badge}
                        </div>

                    </div>

                </div>

            </div>
        `;

        mobileContainer.insertAdjacentHTML("beforeend", card);
    });
}

// Search + Filter + Sort
function filterMobiles() {

    let filtered = [...mobiles];

    // Search
    const searchText = searchBox.value.toLowerCase();

    if (searchText) {
        filtered = filtered.filter(phone =>
            `${phone.Brand} ${phone.Model}`
                .toLowerCase()
                .includes(searchText)
        );
    }

    // Brand Filter
    const brand = brandFilter.value;

    if (brand !== "All") {
        filtered = filtered.filter(
            phone => phone.Brand === brand
        );
    }

    // Price Sort
    if (sortPrice.value === "low") {

        filtered.sort(
            (a, b) => Number(a.Price) - Number(b.Price)
        );

    } else if (sortPrice.value === "high") {

        filtered.sort(
            (a, b) => Number(b.Price) - Number(a.Price)
        );
    }

    displayMobiles(filtered);
}

// Events
searchBox.addEventListener("input", filterMobiles);

brandFilter.addEventListener("change", filterMobiles);

sortPrice.addEventListener("change", filterMobiles);

// Initial load
loadMobiles();