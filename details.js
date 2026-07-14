/* ==========================================
   Tech Universe Inventory
   details.js
========================================== */

let products = [];

// Product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Load Product
async function loadProduct() {

    try {

        const response = await fetch(API_URL);
        const text = await response.text();

        // Remove Google Visualization wrapper (parsed safely instead
        // of relying on a fixed character offset)
        const jsonText = text.substring(
            text.indexOf("{"),
            text.lastIndexOf("}") + 1
        );
        const json = JSON.parse(jsonText);

        const rows = json.table.rows;
        const cols = json.table.cols;

        products = rows.map(row => {

            let obj = {};

            cols.forEach((col, index) => {

                obj[col.label] = row.c[index]
                    ? row.c[index].v
                    : "";

            });

            return obj;

        });

        showProduct();

    }

    catch(error){

        console.error(error);

        document.querySelector(".details-container").innerHTML =
        "<h2>Unable to load product.</h2>";

    }

}

function showProduct(){

    const product = products.find(
        p => String(p.ID) === String(productId)
    );

    if(!product){

        document.querySelector(".details-container").innerHTML =
        "<h2>Product Not Found</h2>";

        return;

    }

    // Basic Info
    document.title = product.Model + " | Tech Universe";

    document.getElementById("modelName").textContent =
        product.Model;

    document.getElementById("price").textContent =
        CURRENCY + product.Price;

    document.getElementById("phoneImage").src =
        product.Image ? IMAGE_FOLDER + product.Image : DEFAULT_IMAGE;

    document.getElementById("phoneImage").alt =
        product.Model;

    // Specifications
    const specBox = document.getElementById("specifications");

    specBox.innerHTML = "";

    Object.entries(product).forEach(([key,value])=>{

        if(
            key==="ID" ||
            key==="Model" ||
            key==="Price" ||
            key==="Image"
        ) return;

        if(value==="") return;

        specBox.innerHTML += `

        <p>
            <strong>${key}</strong><br>
            ${value}
        </p>

        `;

    });

}

loadProduct();
