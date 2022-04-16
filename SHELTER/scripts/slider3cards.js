let sliderBlock = document.querySelector(".cards");
let countCardsInSlider;
window.addEventListener("load", () => {
    computeDependencies();
    justAddAfterNewSlider();
});

window.addEventListener("resize",()=>{
   
    if(computeDependencies()){
        justAddAfterNewSlider();
    }
})

document.querySelectorAll(".buttonArrow").forEach(el => el.addEventListener("click", showNextCards));

function showNextCards(event) {
    sliderBlock = document.querySelector(".cards");
    let direction = event.target.closest('div').classList[1];
    let newSlider = createNewSlider();
    if (direction === "slider__control_right") {

        sliderBlock.after(newSlider);
    } else {

        sliderBlock.before(newSlider);
    }
    sliderBlock.remove();
    updateLinks();
}
function justAddAfterNewSlider() {
    sliderBlock = document.querySelector(".cards");
    sliderBlock.after(createNewSlider());

    sliderBlock.remove();
    updateLinks();
}
function computeDependencies() {
    let widthScreen = document.documentElement.clientWidth;
    let isChangeScreen=countCardsInSlider;
    if (widthScreen >= 1280) {
        countCardsInSlider = 3;
    }
    else if (widthScreen < 1280 && widthScreen >= 768) {
        countCardsInSlider = 2;
    }
    else if (widthScreen < 768) {
        countCardsInSlider = 1;
    }
    return (isChangeScreen===countCardsInSlider)?false:true;
}
function createNewSlider() {
    let newSliderBlock = document.createElement("div");
    newSliderBlock.classList.add("cards");

    while (newSliderBlock.querySelectorAll(".slider__card").length < countCardsInSlider) {
        //проверка на уникальность 
        let newCard = createCard(Math.floor(Math.random() * 8))
        if (unicCheck(newCard, sliderBlock)) {
            //Проверка на совпадения с прошлым слайдером
            if (unicCheck(newCard, newSliderBlock)) {
                //Проверка на дублирование втекущем слайдере
                newSliderBlock.append(newCard);
            }
        }
    }

    return newSliderBlock;
}

function unicCheck(checkedElem, baseCollection) {
    let nameCheckPet = checkedElem.querySelector(".card__p").textContent;
    let baseCards = baseCollection.querySelectorAll(".slider__card");
    for (let prop of baseCards) {
        let nameOfPet = prop.querySelector(".card__p").textContent;
        if (nameCheckPet == nameOfPet) return false;
    }
    return true;
}
function createCard(numCard) {
    let el = infoAboutPets[numCard];
    let card = document.createElement("div");
    card.classList.add("slider__card")
    card.insertAdjacentHTML('afterbegin',
        `<img class="card__img" src="${el.img}"
    alt="${el.name}-${el.breed}">
<p class="card__p">${el.name}</p>
<button class="button__secondary card__button">Learn more</button>
`);

    return card;
}