//Видеоплеер для сериалов. Должен поддерживать следующие функции: Отображение списка серий сезона. По клику на название серии она начинает воспроизводится. Просмотр текущей серии. Управляется по клику на активную область видео: play/pause. Прогресс воспроизведения отображается в прогресс-баре под видео. Возможна регулировка громкости при помощи input range. Переключение между сериями при помощи кнопок. 

let video = document.querySelector("#video1")

//play/pause
document.getElementById("playPause").onclick = () =>{
	
	if(video.paused){
		video.play()
		document.getElementById("playPause").style.backgroundImage = "url(video/img/pause.png)"
	}

	else{
		document.getElementById("playPause").style.backgroundImage = "url(video/img/play.png)"
		video.pause()
	}
}


//video progress
let videoRange = document.querySelector("#progress")

videoRange.setAttribute("min", 0);
videoRange.setAttribute("max", video.duration);
videoRange.addEventListener('input', function () {         
            video.currentTime = videoRange.value;
        }, false);


//p time
let timeChange = document.getElementById("time")
video.addEventListener('timeupdate', function(){
	timeChange.innerHTML = secondsToTime(video.currentTime)
})


//volume
let videoVolume = document.querySelector("#volume")

videoVolume.addEventListener('input', function(){
	video.volume = videoVolume.value
})


//series pick

let series1 = document.getElementById("series1")
let series2 = document.getElementById("series2")
let series3 = document.getElementById("series3")

series1.onclick = () =>{
	video.src = "video/Hometown.mp4"
}

series2.onclick = () =>{
	video.src = "video/Hometown2.mp4"
}

series3.onclick = () =>{
	video.src = "video/Hometown3.mp4"
}



function secondsToTime(time){    
        	if(video.duration==video.currentTime) document.getElementById("playPause").style.backgroundImage = "url(video/img/pause.png)"
            videoRange.value = video.currentTime;


            let h = Math.floor(time / (60 * 60)),
                dm = time % (60 * 60),
                m = Math.floor(dm / 60),
                ds = dm % 60,
                s = Math.ceil(ds);
            if (s === 60) {
                s = 0;
                m = m + 1;
            }
            if (s < 10) {
                s = '0' + s;
            }
            if (m === 60) {
                m = 0;
                h = h + 1;
            }
            if (m < 10) {
                m = '0' + m;
            }
            if (h === 0) {
                fulltime = m + ':' + s;
            } else {
                fulltime = h + ':' + m + ':' + s;
            }
            return fulltime;
        }


			
