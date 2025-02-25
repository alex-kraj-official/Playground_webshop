let intoCartBtns = document.getElementsByClassName("intoCartBtn"); //get all into cart buttons

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

        if (storedIntoCartProds[intoCartProdId]){ //if the added product is already added to the cart once (its quantity is >0)
            storedIntoCartProds[intoCartProdId].quantity += 1; //then don't create a new copy instead just increase the quantity by 1
        }
        else{ //if the currently added product isn't added already to the cart (its quantity is 0)
            storedIntoCartProds[intoCartProdId] = { //then create it in the storedIntoCartProds
                img: intoCartProdImg,
                name: intoCartProdName,
                price: intoCartProdPrice,
                quantity: 1
            };
        }

        localStorage.setItem("products", JSON.stringify(storedIntoCartProds)); //save the updated cart with the new product(s) added
        addAProductToCartMain(); //display the changed No. items in the cart
    };    
}