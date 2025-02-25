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