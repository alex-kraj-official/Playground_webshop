//Declare variables: info of the product added to the cart
let intoCartProdId; //the id of the product which added to the cart
let intoCartProdImg; //the image of the product which added to the cart
let intoCartProdName; //the name of the product which added to the cart
let intoCartProdPrice; //the price of the product which added to the cart

//Declare variables: emptycart msg and remove button
const yourCartIsEmptyText = document.getElementById("yourCartIsEmptyText"); //the element which displays the msg "Your cart is currently empty."
const cartContent = document.getElementById("cartContent");
const cartRemoveAllBtnDiv = document.getElementById("cartContentFooter"); //the element which contains cartRemoveAllBtn
const cartRemoveAllBtn = document.getElementById("cartRemoveAllBtn"); //the element (button) with the customer can empty his/her cart

updateCartCartPage(); //update the info/look of the cart (No. items added, display the empty msg or the empty button and display or hide the prod table)

//Update the info/look of the cart (No. items added, display the empty msg or the empty button and display or hide the prod table)
function updateCartCartPage(){
    if(cartCounterValue == 0){ //if there is NOT any item in the cart (it's empty)
        yourCartIsEmptyText.textContent = "A kosarad jelenleg üres." //display the msg "your cart is empty"
        cartRemoveAllBtnDiv.style.display = "none"; //hide the "empty your cart" button
    }
    else{ //if there IS any item in the cart (it's not empty)
        yourCartIsEmptyText.textContent = ""; //empty the textcontent of the "your cart is empty" element
        cartRemoveAllBtnDiv.style.display = "flex"; //display the "empty your cart" button
        displayCartItems(); //display items added to the cart
        displayCurrencyCartPage(); //add the currency after unit prices
    }
}

//Add the currency after unit prices
function displayCurrencyCartPage(){
    const productPriceElements = document.getElementsByClassName("productPrice"); //get all unitprice values of all products in the cart content
    Array.from(productPriceElements).forEach(productPrice => {
        productPrice.textContent = productPrice.textContent + " Ft"; //display/put currency text after unitprice values
    });
}

//Display items added to the cart
function displayCartItems() {
    const storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {}; //get added to the cart products from localstorage

    //create cartContent which contains products table and the added products
    cartContent.innerHTML = `
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
                        <!--<div class="productCard" id="product_01">
                            <div class="productData">
                                <img class="productImg" src="./images/products/01_Sonic_figura.jpg" alt="Sonic figura">
                                <div class="productText">
                                    <div class="productName">Sonic figura</div>
                                    <div class="productPrice">7495 Ft</div>
                                    <div class="productNoItems">10 db</div>
                                    <div class="productSubtotal">74950 Ft</div>
                                </div>
                            </div>
                        </div>-->
                    </div></td></tr>
                </tbody>
            </table>
        </div>
    `;

    const cartContainer = document.getElementById("cartContainer"); //the container to display products

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
                    <div class="productPrice">${product.price}</div>
                    <div class="productNoItems">${product.quantity} db</div>
                    <div class="productSubtotal">${product.price * product.quantity} Ft</div>
                </div>
            </div>
        `;

        cartContainer.appendChild(productCardDiv); //add the html element (child) to the end of the cartContainer (parent) div
        index++; //increase the id index of the products to display by 1
    });
}

//Remove all items from the cart if the "empty your cart" button is clicked
cartRemoveAllBtn.onclick = function(){
    cartCounterValue = 0; //set the displayed No. items on the navbar (declared: main.js:26)
    localStorage.setItem("cartCounterValue", cartCounterValue); //store the No. items added locally
    updateCartCounterMain(); //update (only) the cart counter
    cartContent.innerHTML = ``; //remove added products table and products html
    updateCartCartPage(); //update the info of the cart (only on cart page!)
    globalThis.scrollTo({ top: 0}); //jump to the top of the page
    localStorage.removeItem("products"); //delete all products from localStorage
}