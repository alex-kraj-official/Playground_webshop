const video = document.getElementById('myVideo'); //get the bg video from the opened html file
        
//When the page reloads or navigating to a new page the set the time of the bg video where it was before
window.onload = function() {
    if (sessionStorage.getItem('videoTime')) { //if there is a videoTime saved before to the localstorage -> get it
        video.currentTime = parseFloat(sessionStorage.getItem('videoTime')); //set the time of the bg video to the saved time got from localstorage
    }
};

//Before reloading the page or navigating to a new page save the current time of the bg video
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('videoTime', video.currentTime); //save the current time of the bg video
});

//Current full path and html filename
const currentHtmlFile = window.location.pathname; //get the full path of the opened html file
const currentHtmlPageFilename = currentHtmlFile.substring(currentHtmlFile.lastIndexOf('/') + 1); //get the filename of the html file from the full path ("".html)

//Variables for path of the favicon and the bg image
let faviconPath;
let backgroundPath;

//No. items in the cart currently
let cartCounter = document.getElementById("cartCounter"); //declare the element which displays the number of items in the cart
let cartCounterValue; //get the value which displayed in the cartCounter element (No. items in the cart)

//Load these functions when a page loads/reloads
updateCartCounterMain(); //update the counter next to the cart icon on every page
loadMainImgs(); //load the favicon and the background image on every page

//Load the favicon and the background image on every page
function loadMainImgs(){
    if(currentHtmlPageFilename.includes("lol") ? dot = ".." : dot = "."); //check if the current page is a products page and stores the correct No. dots into the path
    faviconPath = `${dot}/images/favicon.png`; //declare the full path of the favicon
    //backgroundPath = `${dot}/images/background.mp4`; //declare the full path of the background image
    document.getElementById("icon").href = faviconPath; //set the favicon
    //document.body.style.backgroundImage = `url('${backgroundPath}')`; //set the background image
}

//Update the counter next to the cart icon on every page
function updateCartCounterMain(){
    cartCounterValue = parseInt(localStorage.getItem("cartCounterValue")) || 0; //the value which displayed in the cartCounter element (No. items in the cart)
    if(cartCounterValue != 0){ //if there IS any item in the cart (it's not empty)
        cartCounter.textContent = cartCounterValue; //display the number of the added items on the navbar
    }
    else{ //if there is NOT any item in the cart (it's empty)
        cartCounter.textContent = "0"; //hide the number of the added items on the navbar
    }
}

//If a product added to the cart increase the counter next to the cart icon
function addAProductToCartMain(){
    addedQuantity = parseInt(localStorage.getItem("addedQuantity"));
    cartCounterValue += addedQuantity; //increase the value of the stored items in the cart
    cartCounter.textContent = cartCounterValue; //display the new value on the navbar next to the cart icon
    localStorage.setItem("cartCounterValue", cartCounterValue); //set and store the new value between pages
    addedQuantity = 1; //reset the added quantity number
    localStorage.setItem("addedQuantity", addedQuantity); //store the resetted added quantity locally
}