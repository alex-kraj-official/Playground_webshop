const minusQuantityBtns = document.getElementsByClassName("Minus"); //get all minus quantity changer buttons
const plusQuantityBtns = document.getElementsByClassName("Plus"); //get all plus quantity changer buttons
let addedQuantity = 1;
const intoCartBtns = document.getElementsByClassName("newCartBtn"); //get all into cart buttons

let cartSumValValValue = parseInt(localStorage.getItem("cartSumValValValue")); //get the total amount from localstorage
let cartFinValValValue = parseInt(localStorage.getItem("cartFinValValValue")); //get the final amount from localstorage

displayCurrencyHomePage(); //display the currency after unit price values

const pQNumInput = document.getElementsByClassName("pQNumInput");
for (let input of pQNumInput) {
    input.addEventListener('dblclick', function () {
        // Csak kijelölés, de ne módosítsuk a szöveget
        this.select();

        // Kijelöljük a legközelebbi termék kártyát
        let productCard = this.closest(".productCard");
        let productNav = productCard.querySelector(".productQuantity");
        let qElement = productNav.querySelector(".pQNumInput");

        // A qElement textContent-jét beállítjuk a value-ra
        // Ha ez az első kattintás, akkor a textContent beállítása nem módosítja az értéket
        qElement.setAttribute('data-value', String(qElement.textContent)); // Tároljuk el a kezdeti értéket

        // A textContent frissítése, és a qElement.value beállítása
        qElement.textContent = qElement.value;  // A szöveg nem változik, csak a value frissül
        qElement.setAttribute('data-value', qElement.value); // A value frissítése
        addedQuantity = qElement.value;
    });
}

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
        let productCard = this.closest(".productCard"); //get the closest productCard to the button clicked

        //Reset the quantity number of the added product
        let productNav = productCard.querySelector(".productQuantity"); //get the productNav section of the clicked minus button
        let qElement = productNav.querySelector(".pQNumInput"); //get the element which contains the displayed quantity of the product
        let qProdQuantity = parseInt(qElement.value); //store the textContent of the element which contains the displayed quantity of the product as a number
        addedQuantity = qProdQuantity;

        //Get the data of the added product
        let intoCartProdId = productCard.id; //store the id of the clicked product
        let intoCartProdImg = productCard.querySelector(".productImg").src; //store the image of the clicked product
        let intoCartProdName = productCard.querySelector(".productName").textContent; //store the name of the clicked product
        let intoCartProdPrice = productCard.querySelector(".productPrice").textContent.split(" ")[0]; //store the price of the clicked product

        //Store the data of the added product
        let storedIntoCartProds = JSON.parse(localStorage.getItem("products")) || {}; //get the already added products from localstorage
        if (storedIntoCartProds[intoCartProdId]){ //if the added product is already added to the cart once (its quantity is > 0)
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

        qProdQuantity = 1; //reset the quantity number to 1
        qElement.value = qProdQuantity; //display the new quantity after clicking the cart button

        cartSumValValValue += intoCartProdPrice * addedQuantity;
        cartFinValValValue += intoCartProdPrice * addedQuantity;
        localStorage.setItem("cartSumValValValue", cartSumValValValue);
        localStorage.setItem("cartFinValValValue", cartFinValValValue);

        localStorage.setItem("products", JSON.stringify(storedIntoCartProds)); //save the updated cart with the new product(s) added
        localStorage.setItem("addedQuantity", addedQuantity); //store the added quantity of the product added to the cart, to display the cartCounter on the navbar
        addAProductToCartMain(); //display the changed No. items in the cart
    };    
}

//Define the behavior of the minus buttons under each product
for (let btn of minusQuantityBtns){
    btn.onclick = function(){
        let productNav = this.closest(".productQuantity"); //get the productNav section of the clicked minus button
        let qElement = productNav.querySelector(".pQNumInput"); //get the element which contains the displayed quantity of the product
        let qProdQuantity = parseInt(qElement.value); //store the textContent of the element which contains the displayed quantity of the product as a number
        qProdQuantity = Math.max(1, qProdQuantity - 1); //the quantity number equals the previous quantity - 1 and can't be less than 1
        qElement.value = qProdQuantity; //display the new quantity after clicking the minus button
        //addedQuantity declared at (in this) products.js:3
        addedQuantity = qProdQuantity; //store the new quantity number to get the added quantity number of the product when added to the cart
    }
}

//Define the behavior of the plus buttons under each product
for (let btn of plusQuantityBtns){
    btn.onclick = function(){
        let productNav = this.closest(".productQuantity"); //get the productNav section of the clicked minus button
        let qElement = productNav.querySelector(".pQNumInput"); //get the element which contains the displayed quantity of the product
        let qProdQuantity = parseInt(qElement.value); //store the textContent of the element which contains the displayed quantity of the product as a number
        qProdQuantity += 1; //the quantity number equals the previous quantity + 1
        qElement.value = qProdQuantity; //display the new quantity after clicking the minus button
        //addedQuantity declared at (in this) products.js:3
        addedQuantity = qProdQuantity; //store the new quantity number to get the added quantity number of the product when added to the cart
    }
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