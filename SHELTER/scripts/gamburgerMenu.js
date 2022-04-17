
let menuBtn = document.querySelector("#burger__toggle");
let isActive = false;

document.querySelector(".burger__btn").addEventListener("click",
    (event) => {
        isActive = !isActive;
        isActive ? showMenu() : hideMenu();
        
        document.body.addEventListener("click", isNeedClosure);
        document.querySelectorAll(".navigation__link")
        .forEach(el =>{
           el.addEventListener("click", hideMenu);   
        });
        
    });



function isNeedClosure(event) {
    if ((event.clientX < (document.documentElement.clientWidth - 320)) && isActive) {
        console.log("hideMenu",)
        hideMenu();
    }
}
function showMenu() {
    document.querySelector(".burger__btn").classList.remove("aback");
    document.querySelector(".burger__btn").classList.add("forward");
    document.querySelector(".navigation").classList.add("toggleNavigation");
    document.querySelector(".burger__background").classList.add("toggleBurger__background");
    document.querySelector(".darkenAllPage").classList.add("toggleDarkenAllPage");
}
function hideMenu() {
    document.querySelector(".burger__btn").classList.add("aback");
    document.querySelector(".burger__btn").classList.remove("forward");
    document.querySelector(".navigation").classList.remove("toggleNavigation");
    document.querySelector(".burger__background").classList.remove("toggleBurger__background");
    document.querySelector(".darkenAllPage").classList.remove("toggleDarkenAllPage");
    isActive = false;
}

