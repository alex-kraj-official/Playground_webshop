let cartCounter = document.getElementById("cartCounter");
let cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0;
let cartRemoveAllBtn = document.getElementById("cartRemoveAllBtn");

if(cartCounterValue != 0){
    cartCounter.textContent = cartCounterValue;
    cartRemoveAllBtn.style.display = "inline";
}
else{
    cartCounter.textContent = "";
    cartRemoveAllBtn.style.display = "none";
}

cartRemoveAllBtn.onclick = function(){
    cartCounterValue = 0;
    cartCounter.textContent = "";
    cartRemoveAllBtn.style.display = "none";
    localStorage.setItem("cartCounterValue", cartCounterValue);
}