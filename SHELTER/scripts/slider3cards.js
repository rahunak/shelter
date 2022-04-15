

let sliderBlock = document.querySelector(".cards");

let countCardsInSlider = document.querySelectorAll(".slider__card").length;
console.log("кол-во карт в слайдере", countCardsInSlider.length);
console.log("childNodes", sliderBlock.querySelectorAll("div").length)
document.querySelectorAll(".buttonArrow").forEach(el => el.addEventListener("click", showNextCards));

function showNextCards(event) {
    console.log("Math.random() ", Math.floor(Math.random() * 9))
    let direction = event.target.closest('div').classList[1];
    let cards = document.querySelectorAll(".cards .slider__card");

    let leftRemoveCard = cards[0]
    let rightRemoveCard = cards[cards.length - 1];
    let newSlider=createNewSlider();
    if (direction === "slider__control_right") {
        
        newSlider.classList.add("move-to-left");
        sliderBlock.after(newSlider);
    } else {
        newSlider.classList.add("move-to-right");
        sliderBlock.before(createNewSlider());
    }
    sliderBlock.remove();
    updateLinks();
    sliderBlock = document.querySelector(".cards");


}

function createNewSlider() {
    let newSliderBlock = document.createElement("div");
    newSliderBlock.classList.add("cards");
    while (newSliderBlock.querySelectorAll(".slider__card").length < countCardsInSlider) {
        //проверка на уникальность 

        let newCard = createCard(Math.floor(Math.random() * 8))
        
        if(unicCheck(newCard, sliderBlock)){
            //Проверка на совпадения с прошлым слайдером
            if(unicCheck(newCard, newSliderBlock)){
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