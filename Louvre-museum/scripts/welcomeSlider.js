const welcomeImgCount = document.getElementById("welcomeImgCount")

$(document).ready(function(){
    $(".welcome-bg").slick({
        accessibility: true,
        prevArrow: $('#arrow-left'),
        nextArrow: $('#arrow-right'),
        dots: true,
        appendDots: $('#welcome-carousel'),
        autoplay: true,
        zIndex: 2
    })
}).on("beforeChange", (event, slick, current, next) => {
    welcomeImgCount.innerText = "0" + (next + 1)
})



