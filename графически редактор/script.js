//Графический редактор онлайн. Должен содержать следующие инструменты: холст - активная область для рисования (Canvas) карандаш - курсор мыши при нажатой левой кнопке оставляет след выбранного цвета на холсте. ластик - стирает все нарисованные линии, имеет прямоугольную форму. линия - нажатие ЛКМ на активной области фиксирует первую точку линии отрезка, отпускание - вторую. палитра цветов позволяет выбрать новый цвет для рисования (используйте input color). толщина линии определяет толщину линии оставляемой инструментами карандаш и линия, может изменяться от 1 до 10  пикселей
const canvasContainer = document.getElementById('field')
const pencil = document.getElementById("pencil")
const eraser = document.getElementById("eraser")
const canvas = document.getElementById("canvas")
      canvas.width = 1000
      canvas.height = 600   
const ctx = canvas.getContext('2d');
let tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = canvas.width
    tmpCanvas.height = canvas.height
    tmpCanvas.style.position = 'absolute'
    canvasContainer.appendChild(tmpCanvas)
let tmpCtx = tmpCanvas.getContext('2d')
const lines = []
createLines(document.getElementById("line"))
createPalette(document.getElementById("palette"))

function pensilDraw (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let dx = e.movementX;
    let dy = e.movementY;

    if (e.buttons > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - dx, y - dy);
        ctx.stroke();
        ctx.closePath();
    }
}

function lineDraw(e, startX, startY) {
    console.log('x')
    tmpCtx.beginPath();
    x = e.offsetX
    y = e.offsetY

    tmpCtx.moveTo(startX, startY);
    tmpCtx.lineTo(x, y);
    tmpCtx.stroke();
    tmpCtx.closePath();
}

function createLines(linesContainer){
    for(let l = 1; l < 11; l++){
        let lineBlock = document.createElement("div")
        lineBlock.className = "lines" 
        linesContainer.appendChild(lineBlock)
        lineBlock.id = `line${l}`
        lineBlock.style.height = l + "px"
        lineBlock.addEventListener("click", ()=>{ctx.lineWidth = l})
        lines.push(lineBlock)
    }
    lines.forEach(e=>{
        e.onclick = ()=> {

            canvas.onmousemove = lineDraw
            canvas.onmousedown = startLine
            canvas.onmouseup = endLine
        }
    })
}

pencil.onclick = e => {
    canvas.onmouseup = ()=>{}
    canvas.onmousedown = ()=>{}
    canvas.onmousemove = pensilDraw
}


let clearField = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function createPalette(container) {
    for(let r = 0, max = 3; r <= max; r++){
        for(let g = 0; g <= max; g++){
            for(let b = 0; b <= max; b++){
                let colorBlock = document.createElement("div")
                colorBlock.className = "color"
                colorBlock.addEventListener("click", e =>{
                    ctx.strokeStyle = e.target.style.backgroundColor;

                })
                colorBlock.style.backgroundColor = (
              'rgb(' + Math.round(r * 255 / max) + ", "
              + Math.round(g * 255 / max) + ", "
              + Math.round(b * 255 / max) + ")"
            );
                container.appendChild(colorBlock)
            }
        }
    }
}


function startLine(e) {
        x = e.offsetX
        y = e.offsetY
        ctx.beginPath()
        ctx.moveTo(x,y)
        ctx.lineTo(x+1, y+1)
        ctx.stroke()
        tmpCtx.strokeWidth = ctx.strokeWidth
        tmpCtx.strokeStyle = ctx.strokeStyle
        canvas.onmousemove = (e) => {}

}

function endLine(e){        
        let xx = e.offsetX
        let yy = e.offsetY
        ctx.beginPath()
        ctx.moveTo(xx,yy)
        ctx.lineTo(x,y)
        ctx.stroke()
        ctx.closePath()
        tmpCtx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.onmousemove = ()=>{}
}


function drawLines(e){
    let x = 0
    let y = 0
    canvas.addEventListener("onmousedown", startLine)
    canvas.addEventListener("onmouseup", endLine)
}





eraser.onclick = clearField
