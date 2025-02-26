const minusQuantityBtns = document.getElementsByClassName("Minus");
const plusQuantityBtns = document.getElementsByClassName("Plus");
let addedQuantity = parseInt(localStorage.getItem("cartCounterValue"));
const intoCartBtns = document.getElementsByClassName("newCartBtn"); //get all into cart buttons

displayCurrencyHomePage(); //display the currency after unit price values

//Display the currency after unit price values
function displayCurrencyHomePage(){
    let productPriceElements = document.getElementsByClassName("productPrice"); //get all unit price of the products
    Array.from(productPriceElements).forEach(productPrice => {
        productPrice.textContent = productPrice.textContent + " Ft"; //display/put currency text after unitprice values
    });
}

//Create function if an into cart button is clicked (put the item to the cart)
for (let btn of intoCartBtns){
    btn.onclick = function(){
        let productCard = this.closest(".productCard"); //get the closest productcard to the button clicked

        let productNav = productCard.querySelector(".productQuantity");
        let qElement = productNav.querySelector(".productQuantityNumText");
        let qProdQuantity = parseInt(qElement.textContent);
        qProdQuantity = 1;
        qElement.textContent = qProdQuantity;

        let intoCartProdId = productCard.id; //store the id of the clicked product
        let intoCartProdImg = productCard.querySelector(".productImg").src; //store the image of the clicked product
        let intoCartProdName = productCard.querySelector(".productName").textContent; //store the name of the clicked product
        let intoCartProdPrice = productCard.querySelector(".productPrice").textContent.split(" ")[0]; //store the price of the clicked product

        let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {}; //get the already added products from localstorage

        if(addedQuantity==0 ? addedQuantity = 1 : addedQuantity = addedQuantity);

        if (storedIntoCartProds[intoCartProdId]){ //if the added product is already added to the cart once (its quantity is >0)
            storedIntoCartProds[intoCartProdId].quantity += addedQuantity; //then don't create a new copy instead just increase the quantity by 1
        }
        else{ //if the currently added product isn't added already to the cart (its quantity is 0)
            storedIntoCartProds[intoCartProdId] = { //then create it in the storedIntoCartProds
                img: intoCartProdImg,
                name: intoCartProdName,
                price: intoCartProdPrice,
                quantity: addedQuantity
            };
        }

        localStorage.setItem("products", JSON.stringify(storedIntoCartProds)); //save the updated cart with the new product(s) added
        localStorage.setItem("addedQuantity", addedQuantity);
        addAProductToCartMain(); //display the changed No. items in the cart
    };    
}

for (let btn of minusQuantityBtns){
    btn.onclick = function(){
        let productNav = this.closest(".productQuantity");
        let qElement = productNav.querySelector(".productQuantityNumText");
        let qProdQuantity = parseInt(qElement.textContent);
        qProdQuantity = Math.max(1, qProdQuantity - 1);
        qElement.textContent = qProdQuantity;
        addedQuantity = qProdQuantity;
    }
}

for (let btn of plusQuantityBtns){
    btn.onclick = function(){
        let productNav = this.closest(".productQuantity");
        let qElement = productNav.querySelector(".productQuantityNumText");
        let qProdQuantity = parseInt(qElement.textContent);
        qProdQuantity += 1;
        qElement.textContent = qProdQuantity;
        addedQuantity = qProdQuantity;
    }
}

function resetQuantity(){
    let productNav = this.closest(".productQuantity");
    let qElement = productNav.querySelector(".productQuantityNumText");
    let qProdQuantity = parseInt(qElement.textContent);
    qProdQuantity += 1;
    qElement.textContent = qProdQuantity;
    addedQuantity = qProdQuantity;
}

















document.addEventListener("DOMContentLoaded", () => {
    // Az összes "animateBtn" osztályú gombra rakunk event listenert
    document.querySelectorAll(".animateBtn").forEach(button => {
        button.addEventListener("click", (event) => {
            // Megkeressük a termék kártyát, amin belül a gomb van
            const productCard = button.closest('.productCard');
            if (!productCard) return;
            
            // A kártyán belül megkeressük a megfelelő képet
            const image = productCard.querySelector(".imgContainer img");
            // A target továbbra is ID-val működik
            const target = document.getElementById("cartIcon");
            
            if (!image || !target) return;

            // Get dimensions and positions
            const imgRect = image.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            // Create clone
            const clone = image.cloneNode(true);
            document.body.appendChild(clone);
            clone.classList.add("clone");

            // Position clone at the exact starting position in absolute coordinates
            clone.style.width = `${imgRect.width}px`;
            clone.style.height = `${imgRect.height}px`;
            clone.style.position = "fixed";
            clone.style.left = `${imgRect.left}px`;
            clone.style.top = `${imgRect.top}px`;
            clone.style.zIndex = "9999";
            clone.style.pointerEvents = "none";

            // Számoljuk ki a cél középpontját
            const targetCenterX = targetRect.left + (targetRect.width / 2);
            const targetCenterY = targetRect.top + (targetRect.height / 2);
            
            // Számoljuk ki, hogy hová kell pozicionálni a klón bal felső sarkát, 
            // hogy a középpontja a cél középpontjába kerüljön
            const finalLeft = targetCenterX - (imgRect.width / 2);
            const finalTop = targetCenterY - (imgRect.height / 2);

            // 1. fázis: Csak mozgás, méretváltozás nélkül (0.25 mp)
            setTimeout(() => {
                clone.style.transition = "left 1s ease, top 1s ease";
                clone.style.left = `${finalLeft}px`;
                clone.style.top = `${finalTop}px`;
            }, 10);

            // 2. fázis: Méretcsökkentés és halványítás (0.25 mp után kezdődik)
            setTimeout(() => {
                clone.style.transition = "left 0.75s ease, top 0.75s ease, opacity 0.75s ease, transform 0.75s ease";
                clone.style.opacity = "0";
                clone.style.transform = "scale(0.3)";
            }, 260);  // 10ms + 250ms késleltetés

            // Eltávolítás az animáció befejezése után
            setTimeout(() => {
                clone.remove();
            }, 1010);  // 10ms + 1000ms (teljes animáció)
        });
    });
});