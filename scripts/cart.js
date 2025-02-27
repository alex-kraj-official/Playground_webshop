//Declare variables: info of the product added to the cart
let intoCartProdId; //the id of the product which added to the cart
let intoCartProdImg; //the image of the product which added to the cart
let intoCartProdName; //the name of the product which added to the cart
let intoCartProdPrice; //the price of the product which added to the cart

let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {}; //get added to the cart products from localstorage

//Variables to display the total amount and the final amount
const cartSumValVal = document.getElementById("cartSumValVal"); //get the total amount text element
let cartCartSumValValValue = parseInt(localStorage.getItem("cartSumValValValue")); //get the total amount from localstorage
const cartFinValVal = document.getElementById("cartFinValVal"); //get the final amount text element
let cartCartFinValValValue = parseInt(localStorage.getItem("cartFinValValValue")); //get the total amount from localstorage

//Declare variables: emptycart msg and remove button
const yourCartIsEmptyText = document.getElementById("yourCartIsEmptyText"); //the element which displays the msg "Your cart is currently empty."
const cartContentProdTableDiv = document.getElementById("cartContentProdTableDiv");
const cartContentSumTableDiv = document.getElementById("cartContentSumTableDiv");
const cartProdDelBtns = document.getElementsByClassName("prodDelBtn");
const cartRemoveAllBtnDiv = document.getElementById("cartContentFooter"); //the element which contains cartRemoveAllBtn
const cartRemoveAllBtn = document.getElementById("cartRemoveAllBtn"); //the element (button) with the customer can empty his/her cart

updateCartCartPage(); //update the info/look of the cart (No. items added, display the empty msg or the empty button and display or hide the prod table)

//Update the info/look of the cart (No. items added, display the empty msg or the empty button and display or hide the prod table)
function updateCartCartPage(){
    if(cartCounterValue == 0){ //if there is NOT any item in the cart (it's empty)
        yourCartIsEmptyText.textContent = "A kosarad jelenleg üres." //display the msg "your cart is empty"
        cartContentProdTableDiv.style.display = "none";
        cartContentSumTableDiv.style.display = "none";
        cartRemoveAllBtnDiv.style.display = "none"; //hide the "empty your cart" button
    }
    else{ //if there IS any item in the cart (it's not empty)
        yourCartIsEmptyText.textContent = ""; //empty the textcontent of the "your cart is empty" element
        cartContentProdTableDiv.style.display = "block";
        cartContentSumTableDiv.style.display = "flex";
        cartRemoveAllBtnDiv.style.display = "flex"; //display the "empty your cart" button
        displayCartItems(); //display items added to the cart
        displayCurrencyCartPage(); //add the currency after unit prices
    }
    SumNFinVal();
}

function updateCartCartPageAfterProdDelBtn(){
    if(cartCounterValue == 0){ //if there is NOT any item in the cart (it's empty)
        yourCartIsEmptyText.textContent = "A kosarad jelenleg üres." //display the msg "your cart is empty"
        cartContentProdTableDiv.style.display = "none";
        cartContentSumTableDiv.style.display = "none";
        cartRemoveAllBtnDiv.style.display = "none"; //hide the "empty your cart" button
    }
    else{ //if there IS any item in the cart (it's not empty)
        yourCartIsEmptyText.textContent = ""; //empty the textcontent of the "your cart is empty" element
        cartContentProdTableDiv.style.display = "block";
        cartContentSumTableDiv.style.display = "flex";
        cartRemoveAllBtnDiv.style.display = "flex"; //display the "empty your cart" button
    }
    SumNFinVal();
}

//Add the currency after unit prices
function displayCurrencyCartPage(){
    const productPriceElements = document.getElementsByClassName("PriceTxt"); //get all unitprice values of all products in the cart content
    Array.from(productPriceElements).forEach(productPrice => {
        productPrice.textContent = productPrice.textContent + " Ft"; //display/put currency text after unitprice values
    });
}

//Display items added to the cart
function displayCartItems() {
    //create cartContent which contains products table and the added products
    cartContentProdTableDiv.innerHTML = `
        <div id="cartContentInside">
            <table class="cartContentHeadTable">
                <thead>
                    <tr id="cartTableRow">
                        <th class="cartTableItem" id="cartTableItem_item">Tétel</th>
                        <th class="cartTableItem" id="cartTableItem_description">Leírás</th>
                        <th class="cartTableItem cartTableItem_fillerRight10"></th>
                        <th class="cartTableItem cartTableItem_fillerLeft10"></th>
                        <th class="cartTableItem" id="cartTableItem_unitPrice">Egységár</th>
                        <th class="cartTableItem cartTableItem_fillerLeft10"></th>
                        <th class="cartTableItem" id="cartTableItem_NoItems">Darab</th>
                        <th class="cartTableItem cartTableItem_fillerLeft10"></th>
                        <th class="cartTableItem" id="cartTableItem_subtotal">Részösszeg</th>
                        <th class="cartTableItem" id="cartTableItem_fillerRight5"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><div class="cartProds" id="cartContainer">
                    </div></td></tr>
                </tbody>
            </table>
        </div>
    `;

    const cartContainer = document.getElementById("cartContainer"); //the container to display products

    cartCartSumValValValue = 0;
    cartCartFinValValValue = 0;

    let index = 0; //id of the product to display

    //make array from object and go through it
    Object.entries(storedIntoCartProds).forEach(([productId, product]) => {
        const productCardDiv = document.createElement("div"); //create productcard div
        productCardDiv.classList.add("productCard"); //add productCard class to the productcard div
        productCardDiv.id = productId;

        //create a product in html
        productCardDiv.innerHTML = `
            <div class="productData">
                <img class="productImg" src="${product.img}" alt="${product.name}">
                <div class="productText">
                    <div class="productName">${product.name}</div>
                    <div class="productPrice PriceTxt">${product.price}</div>
                    <div class="productNoItems">${product.quantity} db</div>
                    <div class="productSubtotal PriceTxt">${product.price * product.quantity}</div>
                </div>
                <div class="prodDelDiv">
                    <span class="prodDelSpan"><button class="prodDelBtn"><i class="fa-solid fa-trash fa-2x"></i></button></span>
                </div>
            </div>
        `;

        cartContainer.appendChild(productCardDiv); //add the html element (child) to the end of the cartContainer (parent) div
        index++; //increase the id index of the products to display by 1
    });
}

function SumNFinVal(){
    const prodCards = document.getElementsByClassName("productCard");

    cartCartSumValValValue = 0;
    cartCartFinValValValue = 0;

    for (let product of prodCards)
    {
        let productSubtotal = Number(product.querySelector(".productSubtotal").textContent.split(" ")[0]);
        cartCartSumValValValue += productSubtotal;
        cartCartFinValValValue += productSubtotal;
    }

    cartSumValVal.textContent = cartCartSumValValValue + " Ft";
    cartFinValVal.textContent = cartCartFinValValValue + " Ft";
}

for (let btn of cartProdDelBtns) {
    btn.onclick = function () {
        let productCard = this.closest(".productCard"); // Legközelebbi productCard keresése
        let prodId = productCard.id;
        let productSubtotal = Number(productCard.querySelector(".productSubtotal").textContent.split(" ")[0]);
        productCard.remove(); // Eltávolítjuk a HTML-ből

        cartCartSumValValValue -= productSubtotal;
        cartCartFinValValValue -= productSubtotal;
        localStorage.setItem("cartSumValValValue", cartCartSumValValValue);
        localStorage.setItem("cartFinValValValue", cartCartFinValValValue);
        
        // Frissítjük a localStorage-t
        storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {};
        delete storedIntoCartProds[prodId];
        localStorage.setItem("products", JSON.stringify(storedIntoCartProds));

        // Újra beolvassuk a localStorage-ból, hogy biztosan a frissített adatokat használjuk
        cartCounterValue = Object.values(JSON.parse(localStorage.getItem("products")) || {}).reduce((sum, prod) => sum + (prod.quantity || 0), 0);
        localStorage.setItem("cartCounterValue", cartCounterValue);

        updateCartCounterMain(); // Frissítjük a számlálót
        updateCartCartPageAfterProdDelBtn(); // Frissítjük a kosár oldalt
    };
}

//Remove all items from the cart if the "empty your cart" button is clicked
cartRemoveAllBtn.onclick = function(){
    cartCounterValue = 0; //set the displayed No. items on the navbar (declared: main.js:26)
    localStorage.setItem("cartCounterValue", cartCounterValue); //store the No. items added locally
    updateCartCounterMain(); //update (only) the cart counter
    cartContentProdTableDiv.innerHTML = ``; //remove added products table and products html
    localStorage.setItem("cartSumValValValue", 0);
    localStorage.setItem("cartFinValValValue", 0);
    updateCartCartPage(); //update the info of the cart (only on cart page!)
    globalThis.scrollTo({ top: 0}); //jump to the top of the page
    localStorage.removeItem("products"); //delete all products from localStorage
}