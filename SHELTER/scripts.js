

document.querySelectorAll(".button-secondary").forEach(el => el.addEventListener("click", showModalWindow));

function showModalWindow(event) {
    let name = event.currentTarget.previousElementSibling.textContent.toUpperCase();
    let petObj = info.find(el => el.h3.toUpperCase() === name);
    Our_Friends.insertAdjacentHTML("afterbegin",
`<div class="pet-modal">
<div class="modal-window">
    <img src="${petObj.img}" alt="cat ${petObj.alt}" />

    <div class="modal-content">
        <h3>${petObj.h3}</h3>
        <h4>${petObj.h4}</h4>
        <h5>${petObj.h5}
        </h5>
        <ul>
            <li>
                <h5>Age:<span>2 months</span></h5>
            </li>
            <li>
                <h5>Inoculations:<span>none</span></h5>
            </li>
            <li>
                <h5>Diseases:<span>none</span></h5>
            </li>
            <li>
                <h5>Parasites:<span>none</span></h5>
            </li>
        </ul>
    </div>
</div>

<button class="modal-close-btn">
    <img src="/assets/icons/close-button.svg" alt="press to close">
</button>
</div>`);
    document.querySelector(".modal-close-btn").addEventListener("click", hideModalWindow);
}

function hideModalWindow() {
    document.querySelector(".pet-modal").remove();

}
