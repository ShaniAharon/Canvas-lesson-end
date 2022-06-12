var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    //calc the center of the canvas
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //create the circle in the center
    createCircle(center)
    addListeners()
    renderCanvas()
}

function renderCanvas() {
    //save the curr context/style
    gCtx.save()
    //change to blue 
    gCtx.fillStyle = "#ede5ff"
    //clear the canvas
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderCircle()
    //restore the context
    gCtx.restore()
}

function renderCircle() {
    //get the prop we need from the circle 
    const { pos, color, size } = getCircle()
    //draw the circle
    drawArc(pos.x, pos.y, size, color)
}

//handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    //get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isCircleClicked(pos)) return
    setCircleDrag(true)
    //save the pos we start from 
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const circle = getCircle();
    if (circle.isDrag) {
        const pos = getEvPos(ev)
        //calc the delta , the diff we moved
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveCircle(dx, dy)
        //saved the last pos , we remember wqere weve been and move accordingly
        gStartPos = pos
        //the canvas is render agian after every move
        renderCanvas()
    }
}

function onUp() {
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {

    //gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // check if its a touch ev
    if (gTouchEvs.includes(ev.type)) {
        //soo we will not triger the mouse ev
        ev.preventDefault()
        //gets the first touch point
        ev = ev.changedTouches[0]
        //calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()
}

