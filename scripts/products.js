// Generáljuk a productPagePaths tömböt
const productPagePaths = [];
for (let i = 1; i < 6; i++) {
    productPagePaths.push(`/products/products_${i}.html`);
}

const pagesPagination = document.getElementById("paginationMain");

productPagePaths.forEach((path, index) => {
    const link = document.createElement('a');
    link.href = path; // Link célja
    link.textContent = index + 1; // Link szövege
    pagesPagination.appendChild(link);
});