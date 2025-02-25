let currentHtmlFile = window.location.pathname;
const currentHtmlPageFilename = currentHtmlFile.substring(currentHtmlFile.lastIndexOf('/') + 1);

//No. items in the cart currently
let cartCounter = document.getElementById("cartCounter"); //the element which displays the number of items in the cart
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0; //the value which displayed in the cartCounter element (No. items in the cart)

updateCartCounterMain();
loadMainImgs();

function loadMainImgs(){
    if(currentHtmlPageFilename.includes("products")){
        const faviconPath = "../images/favicon.png";
        const backgroundPath = "../images/background.jpg";
        document.getElementById("icon").href = faviconPath;
        document.body.style.backgroundImage = `url('${backgroundPath}')`;
    }
    else{
        const faviconPath = "./images/favicon.png";
        const backgroundPath = "./images/background.jpg";
        document.getElementById("icon").href = faviconPath;
        document.body.style.backgroundImage = `url('${backgroundPath}')`;
    }
}

function updateCartCounterMain(){
    cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0; //the value which displayed in the cartCounter element (No. items in the cart)
    if(cartCounterValue != 0){
        cartCounter.textContent = cartCounterValue; //display the number of the added items on the navbar
    }
    else{
        cartCounter.textContent = ""; //hide the number of the added items on the navbar
    }
}

function addAProductToCartMain(){
    cartCounterValue++;
    cartCounter.textContent = cartCounterValue;
    localStorage.setItem("cartCounterValue", cartCounterValue);
    updateCartCounterMain();
}

/*
const navItems = document.getElementsByClassName("navItem");

for (let clicked_navItem of navItems) {
    clicked_navItem.onclick = function(event) {
        // Nyerd ki a fájlnevet a href értékből
        let clicked_navItemHref = clicked_navItem.href.substring(clicked_navItem.href.lastIndexOf('/') + 1);

        // Hasonlítsd össze a fájlneveket
        if (currentHtmlPageFilename === clicked_navItemHref) {
            event.preventDefault(); // Blokkolja az alapértelmezett viselkedést
        }
    }
}
*/