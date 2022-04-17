window.addEventListener("resize",disableLogo);
function disableLogo(){
  
    if(document.documentElement.clientWidth<768){
        document.querySelector(".logo").addEventListener("click", checkLogo);
    }
    
}


function checkLogo(event) {
    event.preventDefault();
} 

