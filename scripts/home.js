let cartCounter = document.getElementById("cartCounter");
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0;

let intoCartBtns = document.getElementsByClassName("intoCartBtn");

let intoCartProdId;
let intoCartProdImg;
let intoCartProdName;
let intoCartProdPrice;

let intoCartProdData = {
    [intoCartProdId]: [intoCartProdImg, intoCartProdName, intoCartProdPrice]
};

let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {};

if(cartCounterValue != 0){
    cartCounter.textContent = cartCounterValue;
}
else{
    cartCounter.textContent = "";
}

for (let btn of intoCartBtns){
    btn.onclick = function(){
        let productCard = this.closest(".productCard"); // A legközelebbi termékkártya
        intoCartProdId = productCard.id; // Termék azonosítója
        intoCartProdImg = productCard.querySelector(".productImg").src;
        intoCartProdName = productCard.querySelector(".productName").textContent;
        intoCartProdPrice = productCard.querySelector(".productPrice").textContent;
        storedIntoCartProds[intoCartProdId] = intoCartProdData[intoCartProdId];
        localStorage.setItem("products", JSON.stringify(storedIntoCartProds));

        cartCounterValue++;
        cartCounter.textContent = cartCounterValue;
        localStorage.setItem("cartCounterValue", cartCounterValue);
    };
}