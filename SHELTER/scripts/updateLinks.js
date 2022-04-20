function updateLinks(){

    document.querySelectorAll(".petPaginator__card")
    .forEach(el => el.addEventListener("click", showModalWindow));
    document.querySelectorAll(".slider__card")
    .forEach(el => el.addEventListener("click", showModalWindow));
    }