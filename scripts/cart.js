let cartCounter = document.getElementById("cartCounter");
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0;

let intoCartProdId;
let intoCartProdImg;
let intoCartProdName;
let intoCartProdPrice;

let intoCartProdData = {
    [intoCartProdId]: [intoCartProdImg, intoCartProdName, intoCartProdPrice]
};

let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {};

let yourCartIsEmptyText = document.getElementById("yourCartIsEmptyText");
let cartRemoveAllBtn = document.getElementById("cartRemoveAllBtn");

updateCart();

function updateCart(){
    if(cartCounterValue != 0){
        cartCounter.textContent = cartCounterValue;
        yourCartIsEmptyText.textContent = "";
        cartRemoveAllBtn.style.display = "inline";
    }
    else{
        cartCounter.textContent = "";
        yourCartIsEmptyText.textContent = "A kosarad jelenleg üres."
        cartRemoveAllBtn.style.display = "none";
    }
}

cartRemoveAllBtn.onclick = function(){
    cartCounterValue = 0;
    localStorage.setItem("cartCounterValue", cartCounterValue);
    updateCart();
}

function displayCartItems(){
    storedIntoCartProds.forEach(product => {
        let div = document.createElement("div");
        div.classList.add(String(intoCartProdId));
    });
    let [intoCartProdImg, intoCartProdName, intoCartProdPrice] = storedIntoCartProds[intoCartProdId];

    document.getElementById("productImage").src = intoCartProdImg;
    document.getElementById("productName").textContent = intoCartProdName;
    document.getElementById("productPrice").textContent = intoCartProdPrice;
}