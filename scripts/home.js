let cartCounter = document.getElementById("cartCounter");
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0;

let intoCartBtns = document.getElementsByClassName("intoCartBtn");

if(cartCounterValue != 0){
    cartCounter.textContent = cartCounterValue;
}
else{
    cartCounter.textContent = "";
}

for (let btn of intoCartBtns) {
    btn.onclick = function () {
        cartCounterValue++;
        cartCounter.textContent = cartCounterValue;
        localStorage.setItem("cartCounterValue", cartCounterValue);
    };
}