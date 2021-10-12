const galleryImg = document.querySelectorAll("#galleryImg div img")

function debounce(func, wait = 20, immediate = true) {
    var timeout
    return function(){
        var context = this, args = arguments
        var later = function(){
            timeout = null
            if(!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if(callNow) func.apply(context, args)
    }
}

function checkGallerySlide(){
    galleryImg.forEach(galleryImg=>{
        const slideInAt = (window.scrollY + window.innerHeight) - galleryImg.height / 2
        const imgBottom = galleryImg.offsetTop + galleryImg.height
        const isHalfShown = slideInAt > galleryImg.offsetTop
        const isNotScrollPast = window.scrollY < imgBottom - 250

        if(isHalfShown && isNotScrollPast){
            galleryImg.classList.add("active")
        }
        else{
            galleryImg.classList.remove("active")
        }

    })
}

window.addEventListener("scroll", debounce(checkGallerySlide))