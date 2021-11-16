let currentLang = "en"
const lang = {
    "ru": {
        greetings: ["Доброй ночи,", "Доброе утро,", "Добрый день,", "Добрый вечер,"],
        windSpeed: "Скорость ветра",
        units: "м/с",
        humidity: "Влажность",
        language: "Язык",
        imageApi: "Изображения",
        hide: "Скрыть",
        quotes: [
            {
                "quote" : "За любым успешным мужчиной стоит женщина, закатившая глаза.",
                "author" : "Джим Кэрри"
            },
            {
                "quote" : "Я верю в то, что если жизнь дает тебе лимоны - нужно сделать лимонад... И найти того, кому жизнь дает водку, и устроить вечеринку.",
                "author" : "Рон Уайт"
            },
            {
                "quote" : "День без солнца - это как, ну вы знаете, ночь.",
                "author" : "Стив Мартин"
            },
            {
                "quote" : "Моя жизнь нуждаетя в корректировке.",
                "author" : "Морт Сахл"
            },
            {
                "quote" : "Все говорят о погоде, но никто ничего не делает с ней.",
                "author" : "Чарльз Дадли Уорнер"
            },
            {
                "quote" : "Я люблю дэдлайны. Мне нравится свистящий звук, который они издают, когда пролетают мимо.",
                "author" : "Дуглас Адамс"
            },
            {
                "quote" : "Я все...",
                "author" : "Я"
            }
        ]

    },
    "en":{
        greetings: ["Good night,", "Good morning,", "Good afternoon,", "Good evening,"],
        windSpeed: "Wind speed",
        units: "m/s",
        humidity: "Humidity",
        language: "Language",
        imageApi: "Image",
        hide: "Hide",
        quotes: [
            {
                "quote" : "Behind every great man is a woman rolling her eyes.",
                "author" : "Jim Carrey"
            },
            {
                "quote" : "I believe that if life gives you lemons, you should make lemonade... And try to find somebody whose life has given them vodka, and have a party.",
                "author" : "Ron White"
            },
            {
                "quote" : "A day without sunshine is like, you know, night.",
                "author" : "Steve Martin"
            },
            {
                "quote" : "My life needs editing.",
                "author" : "Mort Sahl"
            },
            {
                "quote" : "Everybody talks about the weather, but nobody does anything about it.",
                "author" : "Charles Dudley Warner"
            },
            {
                "quote" : "I love deadlines. I like the whooshing sound they make as they fly by.",
                "author" : "Douglas Adams"
            },
            {
                "quote" : "I'm done...",
                "author" : "Me"
            }
        ]
    }
}

//Language local storage
function setLocalStorageLang(){
    localStorage.setItem("language", currentLang)
}

window.addEventListener("beforeunload", setLocalStorageLang)

function getLocalStorageLang(){
    if(localStorage.language){
        currentLang = localStorage.language
    }
}

window.addEventListener("load", getLocalStorageLang)



//Date-Time
const timeText = document.querySelector(".time")
const dateText = document.querySelector(".date")

const greetingTextSpan = document.querySelector(".greeting")

function showDate(){
    const date = new Date()
    const currDate = date.toLocaleString(currentLang, {
        weekday: "long",
        month: "long",
        day: "numeric"
    })
    dateText.textContent = currDate
}

function showTime(){
    showDate()
    greeting()
    const date = new Date()
    const currTime = date.toLocaleTimeString('it-IT')
    timeText.textContent = currTime
    setTimeout(showTime, 1000)
}
showTime()


//Greeting

function getTimeOfTheDay(hour){
    if(hour >= 0 && hour < 6) return "night"
    else if(hour >= 6 && hour < 12) return "morning"
    else if(hour >= 12 && hour < 18) return "afternoon"
    else if(hour >= 18 && hour < 24) return "evening"
}

function greeting(){
    const date = new Date()
    const hours = date.getHours()
    const dayTime = getTimeOfTheDay(hours)
    const greetingText = `Good ${dayTime}, `;
    greetingTextSpan.textContent = lang[currentLang].greetings[Math.floor(date.getHours()/6)]
}

//Name local storage
const name = document.querySelector(".name")

function setLocalStorageName(){
    localStorage.setItem("name", name.value)
}
window.addEventListener("beforeunload", setLocalStorageName)

function getLocalStorageName(){
    if(localStorage.getItem("name")){
        name.value = localStorage.getItem("name")
    }
}

window.addEventListener("load", getLocalStorageName)


//Slider bg
function getRandomImgNum(){
    let rand = Math.floor((Math.random() * (21 - 1) + 1))
    return (rand < 10)? `0${rand}`:`${rand}`
}

let randImg = getRandomImgNum()

function setSliderBg(dayTime, randImg){

    let img = new Image()
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${randImg}.jpg`
    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`
    }
}
setSliderBg(getTimeOfTheDay(new Date().getHours()), randImg)

//Slider prev-next

const prevSlide = document.querySelector(".slide-prev")
const nextSlide = document.querySelector(".slide-next")

function getSlideNext(){
    let next = +randImg
    if(next < 20){
        next+=1
    }
    else{
        next = 1
    }
    randImg = (next < 10)?`0${next}`:`${next}`
    return randImg
}

function getSlidePrev(){
    let next = +randImg
    if(next > 1){
        next-=1
    }
    else{
        next = 20
    }
    randImg = (next < 10)?`0${next}`:`${next}`
    return randImg
}

prevSlide.addEventListener('click', () =>{
    setSliderBg(getTimeOfTheDay(new Date().getHours()), getSlidePrev())
})
nextSlide.addEventListener('click', () => {
    setSliderBg(getTimeOfTheDay(new Date().getHours()), getSlideNext())
})



//Weather

const weatherError = document.querySelector(".weather-error")
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector(".wind")
const humidity = document.querySelector(".humidity")

const city = document.querySelector(".city")

function setLocalStorageCity(){
    localStorage.setItem("city", city.value)
}
window.addEventListener("beforeunload", setLocalStorageCity)

function getLocalStorageCity(){
    if(localStorage.getItem("city")){
        city.value = localStorage.getItem("city")
    }
}

window.addEventListener("load", getLocalStorageCity)

city.onchange = () =>{
    localStorage.city = city.value
    getWeather();
}


async function getWeather() {
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value||localStorage.city}&lang=${currentLang||localStorage.language}&appid=35dfade92584f4706d84f5f42762a2be&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = lang[currentLang].windSpeed + " : " +  Math.round(data.wind.speed) +  lang[currentLang].units
        humidity.textContent = lang[currentLang].humidity + " : " + Math.round(data.main.humidity) + "%"
        weatherError.textContent = ""
    }
    catch(e){
        weatherError.textContent = "Invalid city"
        temperature.textContent = ""
        weatherDescription.textContent = ""
        wind.textContent = ""
        humidity.textContent = ""

    }

}
window.addEventListener("load", getWeather)



//Quote
function getQuotes() {

    const quote = document.querySelector(".quote")
    const author = document.querySelector(".author")

    let randomQuoteNum = Math.floor((Math.random() * ((lang[currentLang].quotes.length) - 1) + 1))
    quote.textContent = lang[currentLang].quotes[randomQuoteNum].quote
    author.textContent = lang[currentLang].quotes[randomQuoteNum].author
}
window.addEventListener("load", getQuotes)

const changeQuote = document.querySelector(".change-quote")
changeQuote.addEventListener("click", getQuotes)

console.log(lang[currentLang].quotes.length)

//Audio

class AudioPlayer{
    #audio = null
    #currAudioId = null

    constructor(songs, prev, next, playBtn, ul, currTime, totalTime, musicRange, soundRange, sound){
        this.songs = songs
        this.prev = prev
        this.next = next
        this.playBtn = playBtn
        this.ul = ul
        this.currTime = currTime
        this.totalTime = totalTime
        this.musicRange = musicRange
        this.soundRange = soundRange
        this.sound = sound
        this.#currAudioId = 0
        this.#audio = new Audio(this.songs[this.#currAudioId].src)
        this.#audio.ontimeupdate = () => {
            this.musicProgressBar()
        }
        this.prev.onclick = () => {
            this.prevSong()
        }
        this.next.onclick = () => {
            this.nextSong()
        }
        this.playBtn.onclick = () => {
            this.playPause()
        }

        this.soundProgressBar()
        this.sound.onclick = () =>{
            this.sound.classList.toggle("sound-off")
            if(this.sound.classList.contains("sound-off")){
                this.soundRange.value = 0
                this.#audio.volume = 0
            }
        }


        for(let i = 0; i < this.songs.length; i++){
                const li = document.createElement("li")
                li.classList.add("play-item")
                li.textContent = this.songs[i].title
                li.onclick = () =>{
                    this.#currAudioId = i
                    document.getElementById("currentSongText").textContent = li.textContent
                    this.#update()
                }
                this.ul.appendChild(li)
        }
        this.ul.querySelector("li:first-child").classList.add("item-active")
    }

    #update(){
        this.#audio.pause()
        this.#audio = new Audio(this.songs[this.#currAudioId].src)
        this.#audio.ontimeupdate = () => {
            this.musicProgressBar()
        }
        let list = Array.from(this.ul.querySelectorAll("li"))
        for(let i = 0; i < list.length; i++){
            if(i == this.#currAudioId){
                list[i].classList.add("item-active")
                document.getElementById("currentSongText").textContent = list[i].textContent
            }
            else{
                list[i].classList.remove("item-active")
            }
        }
        this.#audio.play()
        this.playBtn.classList.add("pause")
    }
    playPause(){
        if(this.#audio.paused){
            this.#audio.play()
            this.playBtn.classList.add("pause")
        }
        else{
            this.#audio.pause()
            this.playBtn.classList.remove("pause")
        }
    }
    nextSong(){
        if(this.#currAudioId >= this.songs.length - 1){
            this.#currAudioId = 0
        }
        else{
            this.#currAudioId++
        }
        this.#update()
    }
    prevSong(){
        if(this.#currAudioId <= 0){
            this.#currAudioId = this.songs.length - 1
        }
        else{
            this.#currAudioId--
        }
        this.#update()
    }

    formatTime(sec){
        let min = Math.floor((sec/60))
        let seconds = Math.floor(sec - (min*60))
        if(seconds < 10){
            seconds = `0${seconds}`
        }
        return `${min}:${seconds}`
    }

    musicProgressBar(){
        this.musicRange.max = this.#audio.duration
        this.musicRange.value = this.#audio.currentTime
        this.currTime.textContent = (this.formatTime(Math.floor(this.#audio.currentTime)))
        if(this.totalTime.textContent === "NaN:NaN"){
            this.totalTime.textContent = "0:00"
        }
        else{
            this.totalTime.textContent = (this.formatTime(Math.floor(this.#audio.duration)))
        }
        this.musicRange.oninput = () =>{
            this.#audio.currentTime = this.musicRange.value
        }
    }
    soundProgressBar(){
        this.soundRange.min = 0
        this.soundRange.max = 1
        this.soundRange.oninput = () =>{
            if(this.soundRange.value == 0){
                this.sound.classList.add("sound-off")
            }
            else{
                this.sound.classList.remove("sound-off")
            }
            this.#audio.volume = this.soundRange.value
        }
    }
}


const play = document.querySelector(".play")
const next = document.querySelector(".play-next")
const prev = document.querySelector(".play-prev")
const ul = document.querySelector(".play-list")

let currTime = document.getElementById("currTime")
let totalTime = document.getElementById("totalTime")
let musicRange = document.getElementById("musicRange")
let soundRange = document.getElementById("soundRange")
let soundBtn = document.getElementById("sound")

const audioPlayer = new AudioPlayer(audioList, prev, next, play, ul, currTime,totalTime, musicRange, soundRange, sound)



//Settings modal

const settingBtn = document.querySelector(".setting-btn")
const modalSettings = document.querySelector(".modal-settings")

settingBtn.onclick = () =>{
    modalSettings.classList.toggle("hide")
}


//Settings

const ru = document.getElementById("ru")
const en = document.getElementById("en")


function modalSettingsLang(){
    let langText = document.getElementById("langText")
    let imgText = document.getElementById("imgText")
    let hideText = document.getElementById("hideText")

    langText.textContent = lang[currentLang].language
    imgText.textContent = lang[currentLang].imageApi
    hideText.textContent = lang[currentLang].hide
}

window.addEventListener("load", modalSettingsLang)

//Language change
ru.onclick = () => {
    currentLang = "ru"
    showTime()
    getWeather();
    getQuotes()
    modalSettingsLang()
}


en.onclick = () => {
    currentLang = "en"
    showTime()
    getWeather();
    getQuotes()
    modalSettingsLang()
}

//Image API change

async function getImageFromApiUnsplash() {
    const url = "https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=39CR8wGSJlZ4qdX1zTgbwArfV_KhZzDNE1K0_GxPv0g"
    const res = await fetch(url);
    const data = await res.json()
    let img = new Image()
    img.src = data.urls.full
    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`
    }
}

const unsplash = document.getElementById("unsplash")
unsplash.onclick = () =>{
    getImageFromApiUnsplash()
}

async function getImageFromApiFlickr() {
    const url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d484c45cf4515a4a402624d7f12cfd1b&tags=nature&extras=url_l&format=json&nojsoncallback=1"
    const res = await fetch(url);
    const data = await res.json();
    let imgNum = getRandomImgNum()
    let img = new Image()
    img.src = data.photos.photo[imgNum].url_l
    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`
    }
}

const flickr = document.getElementById("flickr")
flickr.onclick = () => {
    getImageFromApiFlickr()
}


const github = document.getElementById("github")
github.onclick = () => {
    setSliderBg(getTimeOfTheDay(new Date().getHours()), randImg)
}

//Hide blocks

const hideWeather = document.getElementById("hideWeather")
const hideMusic = document.getElementById("hideMusic")
const hideTime = document.getElementById("hideTime")
const hideDate = document.getElementById("hideDate")
const hideGreeting = document.getElementById("hideGreeting")
const hideQuote = document.getElementById("hideQuote")

hideWeather.onclick = () =>{
    document.querySelector(".weather").classList.toggle("hide")
    localStorage.weather = localStorage.weather == "true"?"false":"true"
}

hideMusic.onclick = () =>{
    document.querySelector(".player").classList.toggle("hide")
    localStorage.music = localStorage.music == "true"?"false":"true"
}

hideTime.onclick = () =>{
    document.querySelector(".time").classList.toggle("hide")
    localStorage.time = localStorage.time == "true"?"false":"true"
}

hideDate.onclick = () =>{
    document.querySelector(".date").classList.toggle("hide")
    localStorage.data = localStorage.data == "true"?"false":"true"
}

hideGreeting.onclick = () =>{
    document.querySelector(".greeting-container").classList.toggle("hide")
    localStorage.greet = localStorage.greet == "true"?"false":"true"
}

hideQuote.onclick = () =>{
    document.querySelector(".quote-container").classList.toggle("hide")
    localStorage.quo = localStorage.quo == "true"?"false":"true"
}

window.addEventListener("load", () =>{
    if(localStorage.weather == "false")document.querySelector(".weather").classList.add("hide")
    if(localStorage.music == "false")document.querySelector(".player").classList.add("hide")
    if(localStorage.time == "false")document.querySelector(".time").classList.add("hide")
    if(localStorage.data == "false")document.querySelector(".date").classList.add("hide")
    if(localStorage.greet == "false")document.querySelector(".greeting-container").classList.add("hide")
    if(localStorage.quo == "false")document.querySelector(".quote-container").classList.add("hide")

})
