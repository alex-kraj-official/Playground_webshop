let cartCounter = document.getElementById("cartCounter");
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0;

let intoCartBtns = document.getElementsByClassName("intoCartBtn");

let intoCartProdId;
let intoCartProdImg;
let intoCartProdName;
let intoCartProdPrice;

if(cartCounterValue != 0){
    cartCounter.textContent = cartCounterValue;
}
else{
    cartCounter.textContent = "";
}

for (let btn of intoCartBtns){
    btn.onclick = function(){
        let productCard = this.closest(".productCard"); // A legközelebbi termékkártya
        let intoCartProdId = productCard.id; // Termék azonosítója
        let intoCartProdImg = productCard.querySelector(".productImg").src;
        let intoCartProdName = productCard.querySelector(".productName").textContent;
        let intoCartProdPrice = productCard.querySelector(".productPrice").textContent;
    
        // Itt hozzuk létre az adatokat, nem globálisan fent
        let intoCartProdData = {
            [intoCartProdId]: [intoCartProdImg, intoCartProdName, intoCartProdPrice]
        };
    
        let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {};
        if (typeof storedIntoCartProds !== "object") {
            storedIntoCartProds = {}; // Ha valamiért nem objektum, nullázd ki
        }
    
        storedIntoCartProds[intoCartProdId] = intoCartProdData[intoCartProdId]; // Hozzáadjuk az új adatokat
        localStorage.setItem("products", JSON.stringify(storedIntoCartProds)); // Frissítjük a localStorage-t
    
        cartCounterValue++;
        cartCounter.textContent = cartCounterValue;
        localStorage.setItem("cartCounterValue", cartCounterValue);
    };
    
}