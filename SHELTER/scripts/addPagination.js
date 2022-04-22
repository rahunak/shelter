let isChangeScreen;
let petPaginator = document.querySelector(".petPaginator");
let arr = [];
while (arr.length < 48) {
  arr.push(...infoAboutPets.sort(randomSort));
}

let activePage = 1;
let defaultCountCardsOnPage;
let countPages;
updateLinks();
computeDependenciesForPetsPage();

window.addEventListener("resize", () => {
  computeDependenciesForPetsPage();
  if (isChangeDimentions()) {
    let cardsOnPage = document.querySelectorAll(".petPaginator__card");
    cardsOnPage.forEach(el => el.remove());
    pasteCardsIn(1);
    updateLinks();
  }

});

let showFirst = document.querySelector('[data-button-paginator="showFirstPage"]');

showFirst.addEventListener("click", getFirstPage);

let showPrev = document.querySelector('[data-button-paginator="showPrevPage"]');
let infoBtn = document.querySelector('.button__paginator_h4');
let showNext = document.querySelector('[data-button-paginator="showNextPage"]');
let showLast = document.querySelector('[data-button-paginator="showLastPage"]');
showLast.addEventListener("click", getLastPage);

showPrev.addEventListener("click", showPrevPage);
showNext.addEventListener("click", showNextPage);

function getFirstPage() {
  activePage = 1;
  infoBtn.innerHTML = 1;
  getPage(1);
  blockFirstButtons();
  activateLastButtons();
}
function getLastPage() {
  activePage = countPages;
  infoBtn.innerHTML = countPages;
  getPage(countPages);
  blockLastButtons();
  activateFirstButtons();
}

function showPrevPage() {

  if (activePage > 1) {
    activePage--;
  }

  infoBtn.innerHTML = activePage;
  if (activePage === 1) {
    blockFirstButtons();
  } else {
    activateLastButtons();
  }
  getPage(activePage);

}

function showNextPage() {
  if (activePage < countPages) {
    activePage++;
  }

  infoBtn.innerHTML = activePage;
  if (activePage === countPages) {
    blockLastButtons();
  } else {
    activateFirstButtons();
  }
  getPage(activePage);

}

function activateLastButtons() {
  activateButton(showNext);
  activateButton(showLast);
  showNext.childNodes[1].setAttribute("src", "/rahunak-JSFE2022Q1/SHELTER/assets/icons/rightOne.svg");
  showNext.childNodes[1].classList.remove("activateBtn");
  showLast.childNodes[1].setAttribute("src", "/rahunak-JSFE2022Q1/SHELTER/assets/icons/rightDouble.svg");
  showLast.childNodes[1].classList.remove("activateBtn");
}

function blockLastButtons() {
  deactivateButton(showNext);
  deactivateButton(showLast);
  showLast.childNodes[1].setAttribute("src", "/rahunak-JSFE2022Q1/SHELTER/assets/icons/leftDouble.svg");
  showLast.childNodes[1].classList.add("activateBtn");
  showNext.childNodes[1].setAttribute("src", "/rahunak-JSFE2022Q1/SHELTER/assets/icons/leftOne.svg");
  showNext.childNodes[1].classList.add("activateBtn");
}

function activateFirstButtons() {
  activateButton(showFirst);
  activateButton(showPrev);
  showFirst.childNodes[1].setAttribute("src", "/rahunak-JSFE2022Q1/SHELTER/assets/icons/rightDouble.svg");
  showFirst.childNodes[1].classList.add("activateBtn");
  showPrev.childNodes[1].setAttribute("src", "/rahunak-JSFE2022Q1/SHELTER/assets/icons/rightOne.svg");
  showPrev.childNodes[1].classList.add("activateBtn");

}

function blockFirstButtons() {
  deactivateButton(showFirst);
  deactivateButton(showPrev);
  showFirst.childNodes[1].setAttribute("src", "/rahunak-JSFE2022Q1/SHELTER/assets/icons/leftDouble.svg");
  showFirst.childNodes[1].classList.remove("activateBtn");
  showPrev.childNodes[1].setAttribute("src", "/rahunak-JSFE2022Q1/SHELTER/assets/icons/leftOne.svg");
  showPrev.childNodes[1].classList.remove("activateBtn");
}

function randomSort() {
  return Math.floor(Math.random() * 3) - 1;
}

function activateButton(btn) {
  btn.disabled = false;
  btn.classList.add("button__paginator_active")
  btn.classList.remove("button__paginator_disabled")
}

function deactivateButton(btn) {
  btn.disabled = true;
  btn.classList.add("button__paginator_disabled")
  btn.classList.remove("button__paginator_active")
}

function createPetPaginatorCard(data) {
  let newCard = document.createElement("div");
  newCard.classList.add("showAll");
  newCard.classList.add("petPaginator__card");
  newCard.insertAdjacentHTML("afterbegin", `
  <img src="${data.img}" class="petPaginator__img"
  alt="${data.type} - ${data.breed}">
<p class="card__p">${data.name}</p>
<button class="button__secondary petPaginator__btn ">Learn more</button>
`);
  return newCard;
}

function getPage(numberPage = 1) {

  let cardsOnPage = document.querySelectorAll(".petPaginator__card");
  cardsOnPage.forEach(el => el.classList.add("hideAll"));
  cardsOnPage.forEach(el => el.classList.remove("showAll"));



  window.addEventListener("animationend", function (event) {
    cardsOnPage = document.querySelectorAll(".petPaginator__card");
    if (event.animationName == "hideAll") {
      cardsOnPage.forEach(el => el.remove());
      pasteCardsIn(numberPage);
      updateLinks();
    }


  })

}

function pasteCardsIn(numberPage) {
  for (let i = defaultCountCardsOnPage * (numberPage - 1); i < defaultCountCardsOnPage * numberPage; i++) {
    petPaginator.prepend(createPetPaginatorCard(arr[i]));
  }
}

function isChangeDimentions() {
  return isChangeScreen == defaultCountCardsOnPage ? false : true;
}

function computeDependenciesForPetsPage() {
  let widthScreen = window.innerWidth;
  isChangeScreen = defaultCountCardsOnPage;
  if (widthScreen >= 1280) {
    defaultCountCardsOnPage = 8;
  }
  else if (widthScreen < 1280 && widthScreen >= 768) {
    defaultCountCardsOnPage = 6;
  }
  else if (widthScreen < 768) {
    defaultCountCardsOnPage = 3;
  }
  countPages = arr.length / defaultCountCardsOnPage;
}
