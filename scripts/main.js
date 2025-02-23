const faviconPath = "/images/favicon.png";
document.getElementById("icon").href = faviconPath;

const backgroundPath = "/images/background.jpg";
document.body.style.backgroundImage = `url('${backgroundPath}')`;

/*
let currentHtmlFile = window.location.pathname;
const currentHtmlPageFilename = currentHtmlFile.substring(currentHtmlFile.lastIndexOf('/') + 1);

const navItems = document.getElementsByClassName("navItem");

for (let clicked_navItem of navItems) {
    clicked_navItem.onclick = function(event) {
        // Nyerd ki a fájlnevet a href értékből
        let clicked_navItemHref = clicked_navItem.href.substring(clicked_navItem.href.lastIndexOf('/') + 1);

        // Hasonlítsd össze a fájlneveket
        if (currentHtmlPageFilename === clicked_navItemHref) {
            event.preventDefault(); // Blokkolja az alapértelmezett viselkedést
        }
    }
}
*/

const cartIconFull = document.getElementById("cartIconFull");
const navbarUl = document.getElementById("lol");

// Hover események
/*
cartIconFull.addEventListener('mouseenter', () => {
    navbarUl.style.overflow = "visible";
});

cartIconFull.addEventListener('mouseleave', () => {
    navbarUl.style.overflow = "hidden";
});
*/