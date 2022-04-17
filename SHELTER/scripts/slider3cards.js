let isChangeScreen;
let sliderBlock = document.querySelector(".cards__container");

let countCardsInSlider;

computeDependencies();
window.addEventListener("resize", () => {
    computeDependencies();
    if (isChangeDimentions()) {
        justAddNewSlider();
    }
})

document.querySelectorAll(".buttonArrow").forEach(el => el.addEventListener("click", showNextCards));



function showNextCards(event) {
    event.preventDefault();
    computeDependencies();
    document.querySelectorAll(".buttonArrow").forEach(el => el.disabled=true);
    sliderBlock = document.querySelector(".cards__container");
   
    let direction = event.target.closest('button').classList[1];
    let newSlider = createNewSlider();

    if (direction === "slider__control_right") {
        newSlider.classList.add("toLeft", "nextLeftSlider",);
        sliderBlock.classList.add("toLeft");
        sliderBlock.after(newSlider);

    } else if (direction === "slider__control_left") {
        newSlider.classList.add("toRight", "nextRightSlider",);
        sliderBlock.classList.add("toRight");
        sliderBlock.before(newSlider);

    } else {
        console.log("troudle in slider")
    }

    newSlider.addEventListener('animationend', function (event) {
        newSlider.classList.remove("toLeft", "nextLeftSlider", "nextRightSlider", "toRight");
        sliderBlock.remove();
        // btn.disabled = false;
        document.querySelectorAll(".buttonArrow").forEach(el => el.disabled=false);
    })

    updateLinks();
}
function justAddNewSlider() {
    let cardBlock = document.querySelector(".cards")
    sliderBlock = document.querySelector(".cards__container");
    cardBlock.prepend(createNewSlider());

    sliderBlock.remove();
    // console.log("sliderBlock",sliderBlock);
    updateLinks();
}

function createNewSlider() {
    let newSliderBlock = document.createElement("div");
    newSliderBlock.classList.add("cards__container");

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


    let nameCheckPet = checkedElem.querySelector(".card__p").textContent.toUpperCase();
    let baseCards = baseCollection.querySelectorAll(".slider__card");
    for (let prop of baseCards) {
        let nameOfPet = prop.querySelector(".card__p").textContent.toUpperCase();
        if (nameCheckPet == nameOfPet) {
            return false;
        }

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

function computeDependencies() {
    let widthScreen = window.innerWidth;
    isChangeScreen = countCardsInSlider;
    if (widthScreen >= 1280) {
        countCardsInSlider = 3;
    }
    else if (widthScreen < 1280 && widthScreen >= 768) {
        countCardsInSlider = 2;
    }
    else if (widthScreen < 768) {
        countCardsInSlider = 1;
    }

}
function isChangeDimentions() {
    return (isChangeScreen == countCardsInSlider) ? false : true;
}