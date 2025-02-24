let cartProdTableHead = document.getElementById("cartContentHead");

//No. items in the cart currently
let cartCounter = document.getElementById("cartCounter"); //the element which displays the number of items in the cart
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0; //the value which displayed in the cartCounter element (No. items in the cart)

//Info of the product added to the cart
let intoCartProdId; //the id of the product which added to the cart
let intoCartProdImg; //the image of the product which added to the cart
let intoCartProdName; //the name of the product which added to the cart
let intoCartProdPrice; //the price of the product which added to the cart

let yourCartIsEmptyText = document.getElementById("yourCartIsEmptyText"); //the element which displays the msg "Your cart is currently empty."
let cartRemoveAllBtn = document.getElementById("cartRemoveAllBtn"); //the element (button) with the customer can empty his/her cart

updateCart(); //update the info of the cart (No. items added, display the empty msg or the empty button)

//Update the info of the cart
function updateCart(){
    if(cartCounterValue != 0){ //if there's any item in the cart (it's not empty)
        cartCounter.textContent = cartCounterValue; //display the number of the added items on the navbar
        yourCartIsEmptyText.textContent = ""; //empty the textcontent of the "your cart is empty" element
        cartRemoveAllBtn.style.display = "inline"; //display the "empty your cart" button
        cartProdTableHead.style.display = "block"; //display the products table
        displayCartItems();
    }
    else{ //if there isn't any item in the cart (it's empty)
        cartCounter.textContent = ""; //hide the number of the added items on the navbar
        yourCartIsEmptyText.textContent = "A kosarad jelenleg üres." //display the msg "your cart is empty"
        cartRemoveAllBtn.style.display = "none"; //hide the "empty your cart" button
        cartProdTableHead.style.display = "none"; //hide the products table        
    }
}

displayCurrency();
function displayCurrency(){
    let productPriceElements = document.getElementsByClassName("productPrice");
    Array.from(productPriceElements).forEach(productPrice => {
        productPrice.textContent = productPrice.textContent + " Ft";
    });
}

//Remove all items from the cart if the "empty your cart" button is clicked
cartRemoveAllBtn.onclick = function(){
    cartCounterValue = 0; //set the displayed No. items on the navbar
    localStorage.setItem("cartCounterValue", cartCounterValue); //store the No. items added locally
    localStorage.removeItem("products"); //delete all products from localStorage
    location.reload(); //reload the cart page
    updateCart(); //update the info of the cart
    globalThis.scrollTo({ top: 0, left: 0}); //jump to the top of the page
}

//Display items added to the cart
function displayCartItems() {
    let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {}; //get added products from localstorage

    let cartContainer = document.getElementById("cartContainer"); //the container to display products
    //cartContainer.innerHTML = ""; //delete the old products data

    let index = 0; //id of the product to display

    //Make array from object and go through it
    Object.entries(storedIntoCartProds).forEach(([productId, product]) => {
        let div = document.createElement("div"); //create productcard div
        div.classList.add("productCard"); //add productCard class to the productcard div
        div.id = productId;

        //create the whole product html
        div.innerHTML = `
            <div class="productData">
                <img class="productImg" src="${product.img}" alt="${product.name}">
                <div class="productText">
                    <div class="productName">${product.name}</div>
                    <div class="productPrice">${product.price}</div>
                    <div class="productNoItems">${product.quantity} db</div>
                    <div class="productSubtotal">${product.price * product.quantity} Ft</div>
                </div>
            </div>
        `;

        cartContainer.appendChild(div);
        index++; //increase the id index of the products to display by 1
    });
}