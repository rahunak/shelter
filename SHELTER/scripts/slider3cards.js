console.log("try do slider",document.querySelectorAll(".buttonArrow"))

document.querySelectorAll(".buttonArrow").forEach(el=>el.addEventListener("click",showNextCards));
function showNextCards(event){
    console.log("i show you",event)
}