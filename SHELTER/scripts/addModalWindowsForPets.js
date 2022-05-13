/*!
import "../sass/modal"
Сделать ленивую подгрузку сss для окна и самого окна
*/


updateLinks();


let modal;
function showModalWindow(event) {
    document.body.style.overflow = 'hidden';
    let name = event.currentTarget.children[1].textContent.toUpperCase();
    let petObj = infoAboutPets.find(el => el.name.toUpperCase() === name);
    modal = document.createElement("div");
    modal.classList.add("modalWindow__background", "showModal_animation");
    // modal.style.top = window.pageYOffset + "px";
    // modal.style.left = 0 + "px";
    modal.insertAdjacentHTML("afterbegin",
        `<div class="modalWindow">
<div class=" modalWindow__wrapper">
    <img src="${petObj.img}" alt="${petObj.alt}" class="modalWindow__img"/>
    <div class="modalWindow__description">
        <h3 class="modalWindow__h3">${petObj.name}</h3>
        <h4 class="modalWindow__h4">${petObj.type} - ${petObj.breed}</h4>
        <h5 class="modalWindow__h5">${petObj.description}</h5>
        
        <ul  class="modalWindow__ul">
            <li class="modalWindow__li"><span class="modalWindow__circle"></span> 
                <h5 class="modalWindow__h5_bold">Age: <span>${petObj.age}</span></h5>
            </li>
            <li class="modalWindow__li"><span class="modalWindow__circle"></span> 
                <h5 class="modalWindow__h5_bold">Inoculations:<span> ${petObj.inoculations}</span></h5>
            </li>
            <li class="modalWindow__li"><span class="modalWindow__circle"></span> 
                <h5 class="modalWindow__h5_bold">Diseases:<span> ${petObj.diseases}</span></h5>
            </li>
            <li class="modalWindow__li">
               <span class="modalWindow__circle"></span> 
               <h5 class="modalWindow__h5_bold">Parasites:<span> ${petObj.parasites}</span></h5>
            </li>
        </ul>
    </div>
</div>

<button class="modalWindow__btn_close">
    <img src="/shelter/SHELTER/assets/icons/close-button.svg" alt="press to close">
</button>
</div>
`);
    document.body.prepend(modal);
    document.querySelector(".modalWindow__background").addEventListener("click", clickOutsideModal);
    document.querySelector(".modalWindow__btn_close").addEventListener("click", hideModalWindow);
}

function hideModalWindow() {
    document.body.style.overflow = 'visible';
    let modal = document.querySelector(".modalWindow__background");
    modal.classList.add("hideModal_animation");
    modal.addEventListener("animationend", function removeAll() {
        modal.remove("showModal_animation","hideModal_animation");
        modal.removeEventListener("click", showModalWindow);
        modal.removeEventListener("click", removeAll);
        modal.remove();
    })

   
}
function clickOutsideModal(event) {
    let modal = document.querySelector(".modalWindow__wrapper");
    if (!modal) return;
    let coordsModal = modal.getBoundingClientRect();
    if (event.clientX < coordsModal.left || event.clientX > coordsModal.right
        || event.clientY < coordsModal.top || event.clientY > coordsModal.bottom)
        hideModalWindow();
}