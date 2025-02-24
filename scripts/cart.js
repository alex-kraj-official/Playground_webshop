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

updateCart(); //updating the info of the cart (No. items added, display the empty msg or the empty button)

//Updating the info of the cart
function updateCart(){
    if(cartCounterValue != 0){ //if there's any item in the cart (it's not empty)
        cartCounter.textContent = cartCounterValue; //display the number of the added items on the navbar
        yourCartIsEmptyText.textContent = ""; //empty the textcontent of the "your cart is empty" element
        cartRemoveAllBtn.style.display = "inline"; //display the "empty your cart" button
        displayCartItems();
    }
    else{ //if there isn't any item in the cart (it's empty)
        cartCounter.textContent = ""; //hide the number of the added items on the navbar
        yourCartIsEmptyText.textContent = "A kosarad jelenleg üres." //display the msg "your cart is empty"
        cartRemoveAllBtn.style.display = "none"; //hide the "empty your cart" button
    }
}

//Remove all items from the cart if the "empty your cart" button is clicked
cartRemoveAllBtn.onclick = function(){
    cartCounterValue = 0; //set the displayed No. items on the navbar
    localStorage.setItem("cartCounterValue", cartCounterValue); //store the No. items added locally
    localStorage.removeItem("products"); // 🔥 Töröljük a termékeket a localStorage-ból
    location.reload();
    updateCart(); //updating the info of the cart
    globalThis.scrollTo({ top: 0, left: 0});
}

function displayCartItems() {
    let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {}; // Hozzáadás
    if (typeof storedIntoCartProds !== "object" || Array.isArray(storedIntoCartProds)) {
        console.error("HIBA: storedIntoCartProds nem objektum!", storedIntoCartProds);
        storedIntoCartProds = {}; // Nullázzuk, ha rossz az adat
    }

    let cartContainer = document.getElementById("cartContainer"); // A kosár elemeinek megjelenítésére szolgáló konténer
    cartContainer.innerHTML = ""; // Előző tartalom törlése

    let index = 0; // Termék azonosító index

    // Az objektumból tömböt csinálunk, és végigmegyünk rajta
    Object.entries(storedIntoCartProds).forEach(([productId, product]) => {
        let div = document.createElement("div"); // Termék kártya div
        div.classList.add("productCard");
        div.id = productId; // Eredeti azonosítót használjuk

        div.innerHTML = `
            <div class="productData">
                <img class="productImg" src="${product[0]}" alt="${product[1]}">
                <span class="productText">
                    <span class="productName">${product[1]}</span>
                    <span class="productPrice">${product[2]}</span>
                </span>
            </div>
        `;

        cartContainer.appendChild(div);
        index++;
    });
}