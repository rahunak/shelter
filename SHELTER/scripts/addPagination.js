let buttons=document.querySelectorAll(".button__paginator");
buttons.forEach(el=>el.addEventListener("click",showNextPage));

function showNextPage(event){
   console.log(event.target.dataset)


}

let arr=[];
let sortArr=infoAboutPets.map(el=>el.name)//заменить на infoAboutPets и в While
while(arr.length<48){
    arr.push(...sortArr.sort(randomSort));
}

function randomSort(){
    return Math.floor(Math.random()*3)-1;
}
