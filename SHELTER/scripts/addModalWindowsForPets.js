/*!
import "../sass/modal"
Сделать ленивую подгрузку сss для окна и самого окна
*/

console.log("скрипт модалек подключен")

document.querySelectorAll(".petsSlider__btn").forEach(el => el.addEventListener("click", showModalWindow));
document.querySelectorAll(".card__button").forEach(el => el.addEventListener("click", showModalWindow));

function showModalWindow(event) {

    let name = event.currentTarget.previousElementSibling.textContent.toUpperCase();
    let petObj = info.find(el => el.name.toUpperCase() === name);
    let modal = document.createElement("div");
    modal.style.top = window.pageYOffset + "px";
    modal.style.left = 0 + "px";
    modal.insertAdjacentHTML("afterbegin",
        `<div class="modalWindow">
<div class="wrapper modalWindow__wrapper">
    <img src="${petObj.img}" alt="${petObj.alt}" class="modalWindow__img"/>
    <div class="modalWindow__description">
        <h3 class="modalWindow__h3">${petObj.name}</h3>
        <h4 class="modalWindow__h4">${petObj.type} - ${petObj.breed}</h4>
        <h5 class="modalWindow__h5">${petObj.description}</h5>
        
        <ul  class="modalWindow__ul">
            <li class="modalWindow__li">
                <h5 class="modalWindow__h5_bold">Age:<span>${petObj.age}</span></h5>
            </li>
            <li class="modalWindow__li">
                <h5 class="modalWindow__h5_bold">Inoculations:<span> ${petObj.inoculations}</span></h5>
            </li>
            <li class="modalWindow__li">
                <h5 class="modalWindow__h5_bold">Diseases:<span> ${petObj.diseases}</span></h5>
            </li>
            <li class="modalWindow__li">
                <h5 class="modalWindow__h5_bold">Parasites:<span> ${petObj.parasites}</span></h5>
            </li>
        </ul>
    </div>
</div>

<button class="modalWindow__btn_close">
    <img src="/assets/icons/close-button.svg" alt="press to close">
</button>
</div>
`);
    document.body.prepend(modal);
    document.querySelector(".modalWindow").addEventListener("click", hideModalSecondMethod);
    document.querySelector(".modalWindow__btn_close").addEventListener("click", hideModalWindow);
}

function hideModalWindow() {
    document.querySelector(".modalWindow").remove();
}
function hideModalSecondMethod(event) {

    let modal= document.querySelector(".modalWindow__wrapper");
    if(!modal)return;
    let coordsModal=modal.getBoundingClientRect();

    if(event.clientX<coordsModal.left || event.clientX>coordsModal.right 
        || event.clientY<coordsModal.top || event.clientY>coordsModal.bottom) hideModalWindow();
}