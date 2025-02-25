let dot; //stores the correct No. dots into the path
let navLinks = {}; //stores the correct paths on the navbar buttons

setNavLinks(); //creates the correct navbar links onto the navbar buttons

//Creates the correct navbar links onto the navbar buttons
function setNavLinks(){
    if(currentHtmlPageFilename.includes("lol") ? dot = ".." : dot = "."); //check if the current page is a products page and stores the correct No. dots into the path
    //create the correct navLinks
    navLinks = {
        home: `${dot}/home.html`,
        about: `${dot}/about.html`,
        products: `${dot}/products.html`,
        contact: `${dot}/contact.html`,
        cart: `${dot}/cart.html`
    };
    //set the correct navLinks
    document.getElementById("home-link").href = navLinks.home;
    document.getElementById("about-link").href = navLinks.about;
    document.getElementById("products-link").href = navLinks.products;
    document.getElementById("contact-link").href = navLinks.contact;
    document.getElementById("cart-link").href = navLinks.cart;
}