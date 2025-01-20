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
    //link.classList = "productPageBtn";
    pagesPagination.appendChild(link);
});

/*
const currentProductPageHtmlFile = window.location.pathname;
const currentProductPageHtmlFilename = currentProductPageHtmlFile.substring(currentProductPageHtmlFile.lastIndexOf('/') + 1);

const productPageBtns = document.getElementsByClassName("productPageBtn");

for (let clicked_productPageBtn of productPageBtns) {
    clicked_productPageBtn.onclick = function(event) {
        // Nyerd ki a fájlnevet a href értékből
        let clickedProductPageFilename = clicked_productPageBtn.href.substring(clicked_productPageBtn.href.lastIndexOf('/') + 1);

        // Hasonlítsd össze a fájlneveket
        if (currentProductPageHtmlFilename === clickedProductPageFilename) {
            event.preventDefault(); // Blokkolja az alapértelmezett viselkedést
        }
    }
}
*/