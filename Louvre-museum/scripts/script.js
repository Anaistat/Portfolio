
//Burger

let burger = document.getElementById("burger");
let menu = document.getElementById("menu-list");
let welcomeTextPart =  document.getElementById("welcome-text");

burger.onclick = () =>{
    burger.classList.toggle("burger-close");
    menu.classList.toggle("menu-list-active");
    welcomeTextPart.classList.toggle("welcome-text-part-hidden");
};


//Welcome slider

let welcomeArr = ["..images/welcome2.jpg", "..images/welcome3.jpg", "..images/welcome4.jpg", "..images/welcome5.jpg"];
let arrowRight = document.getElementById("arrow-right")
let arrowLeft = document.getElementById("arrow-left")

for(let i = 0; i < welcomeArr.length; i++){
        arrowRight.onclick = () =>{
            document.getElementById("welcome-images").style.background = "linear-gradient(90deg, #030303,  transparent 40%, transparent 100%)," + `url(${welcomeArr[i]})`
        }
}




