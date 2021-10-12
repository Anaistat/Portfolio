const mainPlayButton = document.getElementById("mainPlayButton")
const videoBg = document.getElementById("videoBg")
const video = document.getElementById("louvreVideo")
const playTrack = document.getElementById("play-track")
const volumeBtn = document.getElementById("sound")
const fullScreen = document.getElementById("fullScreen")
const videoContainer = document.getElementById("videoContainer")
const videoRange = document.getElementById("video-range");
const soundRange = document.getElementById("sound-range");

//Play-Pause
let playPause = () => {
    videoBg.style.background = "none"
    mainPlayButton.style.opacity = 0
    if(video.paused){
        video.play()
        playTrack.style.backgroundImage = 'url("images/pause.svg")'
    }
    else{
        video.pause()
        mainPlayButton.style.opacity = 1
        playTrack.style.backgroundImage = 'url("images/play.svg")'
    }
}
videoBg.onclick = playPause

playTrack.onclick = () => {
    videoBg.style.background = "none"
    mainPlayButton.style.opacity = 0
    if(video.paused){
        video.play()
        playTrack.style.backgroundImage = 'url("images/pause.svg")'
    }
    else{
        video.pause()
        mainPlayButton.style.opacity = 1
        playTrack.style.backgroundImage = 'url("images/play.svg")'
    }
}

video.addEventListener('ended',function(){
    video.pause()
    mainPlayButton.style.opacity = 1
    playTrack.style.backgroundImage = 'url("images/play.svg")'
})

//Sound
let videoSound = () => {
    if(!volumeBtn.classList.contains("mute")){
        volumeBtn.classList.add("mute")
        video.volume = 0
    }
    else{
        volumeBtn.classList.remove("mute")
        video.volume = +soundRange.value
    }
}
volumeBtn.onclick = videoSound

//Full Screen
const youtubeArrows = document.getElementById("youtubeArrows")
const youtubeSlider = document.getElementById("youtubeSlider")
let videoFullScreen = () => {
    // if(!videoContainer.classList.contains("full-screen")){
    //     videoContainer.classList.add("full-screen")
    //     fullScreen.style.backgroundImage = 'url("images/fullscreen_exit.svg")'
    //     youtubeSlider.style.display = "none"
    //     youtubeArrows.style.display = "none"
    // }
    // else{
    //     videoContainer.classList.remove("full-screen")
    //     fullScreen.style.backgroundImage = 'url("images/full-screen.svg")'
    //     youtubeSlider.style.display = "flex"
    //     youtubeArrows.style.display = "flex"
    // }
    video.requestFullscreen()
}

fullScreen.onclick = videoFullScreen

//Speed
const set = new Set()


document.onkeydown = (e) =>{
    if(e.keyCode == "77"){
        videoSound()
    }
    if(e.keyCode == "70"){
        videoFullScreen()
    }
    if(e.keyCode =="32"){
        playPause()
    }
}

document.addEventListener('keydown', function (event) {
    if (event.getModifierState("Shift") && event.code === 'Period') {
        video.playbackRate = video.playbackRate - 0.1;
    }
});

document.addEventListener('keydown', function (event) {
    if (event.getModifierState("Shift") && event.code === 'Comma') {
        video.playbackRate = video.playbackRate + 0.1;
    }
});


//Video Range

videoRange.setAttribute("min", 0);

window.onload = () => {
    videoRange.max =  video.duration
}


videoRange.addEventListener('input', function () {
    video.currentTime = videoRange.value;
}, false);


video.addEventListener('timeupdate', function(){
    secondsToTime(video.currentTime)
})


function progressBar(elem){
    elem.oninput = () =>{
        const p = 100* video.currentTime / video.duration
        videoRange.style.background = `linear-gradient(90deg, #710707 0%, #710707 ${p}%, #C4C4C4 ${p}%, #C4C4C4 100%) `;
        videoRange.value = video.currentTime;
        elem.style.background = `linear-gradient(90deg, #710707 0%, #710707 ${p}%, #C4C4C4 ${p}%, #C4C4C4 100%) `;
    }
}
progressBar(videoRange);
progressBar(soundRange);



//volume

soundRange.addEventListener('input', function(){
    video.volume = soundRange.value
    soundRange.style.background = `linear-gradient(90deg, #710707 0%, #710707 ${soundRange.value*100 - 0.1}%, #C4C4C4 ${soundRange.value*100}%, #C4C4C4 100%) `;
    if(video.volume === 0){
        volumeBtn.style.backgroundImage = 'url("images/mute.svg")'
        video.volume = 0
    }
    else volumeBtn.style.backgroundImage = 'url("images/volume.svg")'
})



function secondsToTime(time){
    const p = 100* video.currentTime / video.duration
    videoRange.style.background = `linear-gradient(90deg, #710707 0%, #710707 ${p}%, #C4C4C4 ${p}%, #C4C4C4 100%) `;
    videoRange.value = video.currentTime;
}


//Slider
const videoSrcHTML = video.querySelectorAll("source")
const videoSrc = [...videoSrcHTML]



$(document).ready(function(){
    const x = $(".youtube-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('#arrow_left'),
        nextArrow: $('#arrow_right'),
        dots: true,
        appendDots: $('.video-dots'),
        responsive: [
            {
                breakpoint: 1005,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    })
    x.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        videoSrcHTML.forEach(e => e.remove())
        video.append(videoSrc[nextSlide])
        video.poster = `video/poster${nextSlide}.jpg`
        video.load();
        videoRange.value = 0
        video.currentTime = 0
        videoRange.dispatchEvent(new Event('input'))
    })
})




