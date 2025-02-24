const currentProductPageHtmlFile = window.location.pathname;
const currentProductPageHtmlFilename = currentProductPageHtmlFile.substring(currentProductPageHtmlFile.lastIndexOf('/') + 1);
const currentProductPageNumber = currentProductPageHtmlFilename.replace('products_', '').replace('.html', '');
const productPagePaths = [];

loadProd();
function loadProd(){
    if(currentProductPageHtmlFilename.includes("products")){
        for (let i = 1; i < 6; i++) {
            productPagePaths.push(`../products/products_${i}.html`);
        }
        loadPagination();
    }
    else{
        for (let i = 1; i < 6; i++) {
            productPagePaths.push(`./products/products_${i}.html`);
        }
        loadPagination();
    }
}

function loadPagination(){
    const pagesPagination = document.getElementById("paginationMain");
    let i = 0;

    productPagePaths.forEach((path, index) => {
        i++;
        const link = document.createElement('a');
        link.href = path; // Link célja
        link.textContent = index + 1; // Link szövege
        if(i == currentProductPageNumber){
            link.classList = "activeProductPage";
        }
        //link.classList = "productPageBtn";
        pagesPagination.appendChild(link);
    });
}

/*
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