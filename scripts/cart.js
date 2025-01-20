let cartCounter = document.getElementById("cartCounter");
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0;

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