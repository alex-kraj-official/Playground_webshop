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
const cartContentMain = document.getElementById("cartContentMain");
const cartContentSumTableDiv = document.getElementById("cartContentSumTableDiv");
const cartProdDelBtns = document.getElementsByClassName("prodDelBtn");
const cartRemoveAllBtnDiv = document.getElementById("cartContentFooter"); //the element which contains cartRemoveAllBtn
const cartRemoveAllBtn = document.getElementById("cartRemoveAllBtn"); //the element (button) with the customer can empty his/her cart

const cartMinusBtns = document.getElementsByClassName("cartMinusBtn");
const cartPlusBtns = document.getElementsByClassName("cartPlusBtn");

updateCartCartPage(); //update the info/look of the cart (No. items added, display the empty msg or the empty button and display or hide the prod table)

//Update the info/look of the cart (No. items added, display the empty msg or the empty button and display or hide the prod table)
function updateCartCartPage(){
    if(cartCounterValue == 0){ //if there is NOT any item in the cart (it's empty)
        yourCartIsEmptyText.textContent = "A kosarad jelenleg üres." //display the msg "your cart is empty"
        cartContentMain.style.display = "none";
        //cartContentSumTableDiv.style.display = "none";
        cartRemoveAllBtnDiv.style.display = "none"; //hide the "empty your cart" button
    }
    else{ //if there IS any item in the cart (it's not empty)
        yourCartIsEmptyText.textContent = ""; //empty the textcontent of the "your cart is empty" element
        cartContentMain.style.display = "flex";
        //cartContentSumTableDiv.style.display = "flex";
        cartRemoveAllBtnDiv.style.display = "flex"; //display the "empty your cart" button
        displayCartItems(); //display items added to the cart
        displayCurrencyCartPage(); //add the currency after unit prices
    }
    SumNFinVal();
}

function updateCartCartPageAfterClick(){
    if(cartCounterValue == 0){ //if there is NOT any item in the cart (it's empty)
        yourCartIsEmptyText.textContent = "A kosarad jelenleg üres." //display the msg "your cart is empty"
        cartContentMain.style.display = "none";
        cartContentSumTableDiv.style.display = "none";
        cartRemoveAllBtnDiv.style.display = "none"; //hide the "empty your cart" button
    }
    else{ //if there IS any item in the cart (it's not empty)
        yourCartIsEmptyText.textContent = ""; //empty the textcontent of the "your cart is empty" element
        cartContentMain.style.display = "flex";
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
    const prodTable_Table = document.getElementById("prodTable_Table"); //the container to display products

    cartCartSumValValValue = 0;
    cartCartFinValValValue = 0;

    let index = 0; //id of the product to display

    //make array from object and go through it
    Object.entries(storedIntoCartProds).forEach(([productId, product]) => {
        const productCardRow = document.createElement("div"); //create productcard div
        productCardRow.classList.add("productRow"); //add productCard class to the productcard div
        productCardRow.id = productId;

        //create a product in html
        productCardRow.innerHTML = `
            <div class="productRow_Content">
                <div class="prodTable_Table_Content_Item productImgDiv">
                    <img class="productImg" src="${product.img}" alt="${product.name}">
                </div>
                <div class="prodTable_Table_Content_Item productDescription">${product.name}</div>
                <div class="productPrice prodTable_Table_Content_Item PriceTxt">${product.price}</div>
                <div class="productNoItems prodTable_Table_Content_Item">
                    <div class="cartProdQBtnDiv">
                        <button class="cartProdQBtn cartMinusBtn">
                            <div class="cartProdQBtnTxt">
                                <svg width="15" height="15" viewBox="0 0 20 20">
                                    <line x1="3" y1="10" x2="17" y2="10" stroke-width="2.8"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="productQuantity">${product.quantity} db</div>
                    <div class="cartProdQBtnDiv">
                        <button class="cartProdQBtn cartPlusBtn">
                            <div class="cartProdQBtnTxt">
                                <svg width="15" height="15" viewBox="0 0 20 20">
                                    <line x1="2" y1="10" x2="18" y2="10" stroke-width="3"/>
                                    <line x1="10" y1="2" x2="10" y2="18" stroke-width="3"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
                <div class="productSubtotal prodTable_Table_Content_Item PriceTxt">${product.price * product.quantity}</div>
                <div class="prodDelDiv prodTable_Table_Content_Item">
                    <button class="prodDelBtn"><i class="fa-solid fa-trash fa-2x"></i></button>
                </div>
            </div>
        `;

        prodTable_Table.appendChild(productCardRow); //add the html element (child) to the end of the cartContainer (parent) div
        index++; //increase the id index of the products to display by 1
    });
}

function SumNFinVal(){
    const productRow = document.getElementsByClassName("productRow");

    cartCartSumValValValue = 0;
    cartCartFinValValValue = 0;

    for (let product of productRow)
    {
        let productSubtotal = Number(product.querySelector(".productSubtotal").textContent.split(" ")[0]);
        cartCartSumValValValue += productSubtotal;
        cartCartFinValValValue += productSubtotal;
    }

    cartSumValVal.textContent = cartCartSumValValValue + " Ft";
    cartFinValVal.textContent = cartCartFinValValValue + " Ft";
}

for (let btn of cartMinusBtns) {
    btn.onclick = function(){
        let productRow = this.closest(".productRow");
        let prodId = productRow.id;
        let prodPriceTxt = productRow.querySelector(".productPrice");
        let prodPriceVal = parseInt(prodPriceTxt.textContent.split(" ")[0]);
        let prodQTxt = productRow.querySelector(".productQuantity");
        let prodQVal = parseInt(prodQTxt.textContent.split(" ")[0]);
        let prodSubTotalTxt = productRow.querySelector(".productSubtotal");
        let prodSubTotalVal = parseInt(prodSubTotalTxt.textContent.split(" ")[0]);
        prodQVal = Math.max(1, prodQVal - 1);
        //prodQVal -= 1;
        prodQTxt.textContent = String(prodQVal) + " db";
        prodSubTotalVal = prodPriceVal * prodQVal + " Ft";
        prodSubTotalTxt.textContent = prodSubTotalVal;
        storedIntoCartProds[prodId].quantity = prodQVal;
        localStorage.setItem("products", JSON.stringify(storedIntoCartProds));
        updateCartCartPageAfterClick();
        cartCounterValue = Object.values(JSON.parse(localStorage.getItem("products")) || {}).reduce((sum, prod) => sum + (prod.quantity || 0), 0);
        localStorage.setItem("cartCounterValue", cartCounterValue);
        updateCartCounterMain();
    };
}

for (let btn of cartPlusBtns) {
    btn.onclick = function(){
        let productRow = this.closest(".productRow");
        let prodId = productRow.id;
        let prodPriceTxt = productRow.querySelector(".productPrice");
        let prodPriceVal = parseInt(prodPriceTxt.textContent.split(" ")[0]);
        let prodQTxt = productRow.querySelector(".productQuantity");
        let prodQVal = parseInt(prodQTxt.textContent.split(" ")[0]);
        let prodSubTotalTxt = productRow.querySelector(".productSubtotal");
        let prodSubTotalVal = parseInt(prodSubTotalTxt.textContent.split(" ")[0]);
        prodQVal += 1;
        prodQTxt.textContent = String(prodQVal) + " db";
        prodSubTotalVal = prodPriceVal * prodQVal + " Ft";
        prodSubTotalTxt.textContent = prodSubTotalVal;
        storedIntoCartProds[prodId].quantity = prodQVal;
        localStorage.setItem("products", JSON.stringify(storedIntoCartProds));
        updateCartCartPageAfterClick();
        cartCounterValue = Object.values(JSON.parse(localStorage.getItem("products")) || {}).reduce((sum, prod) => sum + (prod.quantity || 0), 0);
        localStorage.setItem("cartCounterValue", cartCounterValue);
        updateCartCounterMain();
    };
}

for (let btn of cartProdDelBtns) {
    btn.onclick = function () {
        let productRow = this.closest(".productRow"); // Legközelebbi productCard keresése
        let prodId = productRow.id;
        let productSubtotal = Number(productRow.querySelector(".productSubtotal").textContent.split(" ")[0]);
        productRow.remove(); // Eltávolítjuk a HTML-ből

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
        updateCartCartPageAfterClick(); // Frissítjük a kosár oldalt
    };
}

//Remove all items from the cart if the "empty your cart" button is clicked
cartRemoveAllBtn.onclick = function(){
    cartCounterValue = 0; //set the displayed No. items on the navbar (declared: main.js:26)
    localStorage.setItem("cartCounterValue", cartCounterValue); //store the No. items added locally
    updateCartCounterMain(); //update (only) the cart counter
    cartContentMain.innerHTML = ``; //remove added products table and products html
    localStorage.setItem("cartSumValValValue", 0);
    localStorage.setItem("cartFinValValValue", 0);
    updateCartCartPage(); //update the info of the cart (only on cart page!)
    globalThis.scrollTo({ top: 0}); //jump to the top of the page
    localStorage.removeItem("products"); //delete all products from localStorage
}