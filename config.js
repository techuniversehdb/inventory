/* ==========================================
   Tech Universe Inventory
   config.js
========================================== */

// ==========================
// Google Spreadsheet Settings
// ==========================

// Paste only the Spreadsheet ID here
const SHEET_ID = "149m9cI34x9vR7aXfvXflhUd3MNx-1_JzKv78j5Uxoag";

// Sheet Name
const SHEET_NAME = "Products";

// ==========================
// API URL
// ==========================

const API_URL =
`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(SHEET_NAME)}`;

// ==========================
// Website Settings
// ==========================

// Shop Name
const SHOP_NAME = "Tech Universe";

// Currency
const CURRENCY = "₹";

// Image Folder
const IMAGE_FOLDER = "assets/phones/";

// Default Image
const DEFAULT_IMAGE = "assets/no-image.webp";

// ==========================
// Theme
// ==========================

const PRIMARY_COLOR = "#2563eb";
const ACCENT_COLOR = "#e11d48";

// ==========================
// Pagination (Future)
// ==========================

const PRODUCTS_PER_PAGE = 20;
