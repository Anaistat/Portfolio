function compareImages(img){
    let clicked = 0
    let wdth = img.offsetWidth
    let hight = img.offsetHeight
    img.style.width = (wdth/2) + "px"
    let slider = document.createElement("div")
    slider.setAttribute("class", "explore-slider")
    img.parentElement.insertBefore(slider, img)

    //slider position
    slider.style.top = (hight / 2) - (slider.offsetHeight / 2) + "px"
    slider.style.left = (wdth / 2) - (slider.offsetWidth / 2) + "px"


    slider.addEventListener("touchstart", slideReady);
    slider.addEventListener("mousedown", slideReady);
    function slideReady(e) {
        e.preventDefault();
        clicked = 1;

        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }


    window.addEventListener("touchstop", slideFinish);
    window.addEventListener("mouseup", slideFinish);
    function slideFinish() {
        clicked = 0;
    }
    function slideMove(e) {
        let pos;

        if (clicked == 0) return false;
        pos = getCursorPos(e)

        if (pos < 0) pos = 0;
        if (pos > wdth) pos = wdth;

        slide(pos);
    }
    function getCursorPos(e) {
        let a;
        let x = 0;
        e = e || window.event;

        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        x = x - window.pageXOffset;
        return x;
    }

    function slide(x) {
        img.style.width = x + "px";
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
}

let compOverlay = document.getElementsByClassName("comp-overlay")
for(let i = 0; i < compOverlay.length; i++){
    compareImages(compOverlay[i])
}


