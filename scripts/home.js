let cartCounter = document.getElementById("cartCounter");
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0;

let intoCartBtns = document.getElementsByClassName("intoCartBtn");

if(cartCounterValue != 0){
    cartCounter.textContent = cartCounterValue;
}
else{
    cartCounter.textContent = "";
}

displayCurrency();
function displayCurrency(){
    let productPriceElements = document.getElementsByClassName("productPrice");
    Array.from(productPriceElements).forEach(productPrice => {
        productPrice.textContent = productPrice.textContent + " Ft";
    });
}

for (let btn of intoCartBtns){
    btn.onclick = function(){
        let productCard = this.closest(".productCard"); //get the closest productcard to the button clicked
        let intoCartProdId = productCard.id; //store the id of the clicked product
        let intoCartProdImg = productCard.querySelector(".productImg").src; //store the image of the clicked product
        let intoCartProdName = productCard.querySelector(".productName").textContent; //store the name of the clicked product
        let intoCartProdPrice = productCard.querySelector(".productPrice").textContent.split(" ")[0]; //store the price of the clicked product

        let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {};

        if (storedIntoCartProds[intoCartProdId]){
            storedIntoCartProds[intoCartProdId].quantity += 1;
        }
        else{
            storedIntoCartProds[intoCartProdId] = {
                img: intoCartProdImg,
                name: intoCartProdName,
                price: intoCartProdPrice,
                quantity: 1
            };
        }
    
        /*
        let intoCartProdData = {
            [intoCartProdId]: [intoCartProdImg, intoCartProdName, intoCartProdPrice]
        };
    
        let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {};
        if (typeof storedIntoCartProds !== "object"){
            storedIntoCartProds = {};
        }
    
        storedIntoCartProds[intoCartProdId] = intoCartProdData[intoCartProdId];
        localStorage.setItem("products", JSON.stringify(storedIntoCartProds));
        */

        // Frissített kosár elmentése
        localStorage.setItem("products", JSON.stringify(storedIntoCartProds));
    
        cartCounterValue++;
        cartCounter.textContent = cartCounterValue;
        localStorage.setItem("cartCounterValue", cartCounterValue);
    };    
}