window.addEventListener("resize", changeLinks);

document.addEventListener("DOMContentLoaded ",changeLinks)

function changeLinks() {
    if (document.documentElement.clientWidth < 768) {
        document.querySelectorAll(".navigation__link").forEach(el => {
            if (el.innerHTML.trim() === "About the shelter") {
                el.addEventListener("click", moveOnTop);
            }
        });

document.querySelector(".startScreen__button").setAttribute( 'href' , "/shelter/SHELTER/pages/pets/pets.html");



    }
}



function moveOnTop(event) {
    event.preventDefault();
    console.log("move on top")
    window.scrollTo(0, 0);
}
