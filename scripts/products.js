const currentProductPageNumber = currentHtmlPageFilename.replace('products_', '').replace('.html', ''); //get the current number of the products page from its filename
const productPagePaths = []; //it needs to store the correct paths to the products pages

loadProdPagePaths(); //create and store paths to products pages

//Create and store paths to products pages
function loadProdPagePaths(){
    for (let i = 1; i < 6; i++) {
        let productPagePath; //this will store the current correct path to add to productPagePaths array
        if(currentHtmlPageFilename.includes("products")){ //if the current html page filename contains products (it's a products page)
            productPagePath = (`../products/products_${i}.html`); //then this should be the correct path of the pagination buttons
        }
        else{ //if the current page is NOT a prodcuts page
            productPagePath = (`./products/products_${i}.html`); //then this should be the correct path of the pagination buttons
        }
        productPagePaths.push(productPagePath); //add the correct path to the paths array
    }
    loadPagination(); //create the buttons for pagination
}

//Create the buttons for pagination
function loadPagination(){
    const pagesPagination = document.getElementById("paginationMain"); //jump to the place in the html file to create pagination buttons
    let i = 0;

    productPagePaths.forEach((path, index) => {
        i++;
        const link = document.createElement('a'); //create the pagination link button
        link.href = path; //target of the link
        link.textContent = index + 1; //text of the link
        if(i == currentProductPageNumber){ //if the current products page number is this
            link.id = "activeProductPage"; //then add this class to style it
        }
        pagesPagination.appendChild(link); //add the html element (child) to the end of the paginationMain (parent) div
    });
}