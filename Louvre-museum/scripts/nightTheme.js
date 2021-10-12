const nightButton = document.getElementById('lightDarkTheme')
nightButton.onclick = () => {
    const find = document.getElementById('nightMode')
    if (find){
        find.remove()
        nightButton.style.backgroundImage = 'url("images/lightTheme.png")'
        return
    }
    else{
        nightButton.style.backgroundImage = 'url("images/darkTheme.png")'
    }
    const link = document.createElement("link")
    link.href = 'styles/night.css'
    link.rel = "stylesheet"
    link.id = 'nightMode'
    document.head.append(link)
}