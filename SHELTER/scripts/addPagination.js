let arr = [];

while (arr.length < 48) {
  arr.push(...infoAboutPets.sort(randomSort));
}

let activePage = 1;
let defaultCountCardsOnPage;
let countPages = arr.length / defaultCountCardsOnPage;
computeDependenciesForPetsPage();

function computeDependenciesForPetsPage() {
  let widthScreen = window.innerWidth;
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


console.log("countPages",countPages)

window.addEventListener("resize", computeDependenciesForPetsPage);

let showFirst = document.querySelector('[data-button-paginator="showFirstPage"]');
showFirst.addEventListener("click",()=>{
  activePage=1;
  infoBtn.innerHTML = 1;
  getPage(1);
  blockFirstButtons();
  activateLastButtons();
})
let showPrev = document.querySelector('[data-button-paginator="showPrevPage"]');
let infoBtn = document.querySelector('.button__paginator_h4');
let showNext = document.querySelector('[data-button-paginator="showNextPage"]');
let showLast = document.querySelector('[data-button-paginator="showLastPage"]');
showLast.addEventListener("click",()=>{
  activePage=countPages;
  infoBtn.innerHTML = countPages;
  getPage(countPages);
  blockLastButtons();
  activateFirstButtons();
})
showPrev.addEventListener("click", showPrevPage);
showNext.addEventListener("click", showNextPage);

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
function activateLastButtons(){
  activateButton(showNext);
  activateButton(showLast);
}
function blockLastButtons(){
  deactivateButton(showNext);
  deactivateButton(showLast);
}
function activateFirstButtons(){
  activateButton(showFirst);
  activateButton(showPrev);
}
function blockFirstButtons(){
  deactivateButton(showFirst);
  deactivateButton(showPrev);
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
<p class="petPaginator__p">${data.name}</p>
<button class="button__secondary petPaginator__btn ">Learn more</button>
`);
  return newCard;
}
let petPaginator = document.querySelector(".petPaginator");

function getPage(numberPage = 1) {
  let cardsOnPage = document.querySelectorAll(".petPaginator__card");
  cardsOnPage.forEach(el=>el.classList.add("hideAll"))
  for (let i = defaultCountCardsOnPage * (numberPage - 1); i < defaultCountCardsOnPage * numberPage; i++) {
    petPaginator.prepend(createPetPaginatorCard(arr[i]));
  }
  window.addEventListener("animationend",function(){
  cardsOnPage.forEach(el => el.remove());
  })
}

