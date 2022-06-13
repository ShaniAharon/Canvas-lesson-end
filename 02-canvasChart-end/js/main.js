var gStars = [
    {
        name: 'Michael',
        rate: 200,
    },
    {
        name: 'Static',
        rate: 130
    },
    {
        name: 'Jon',
        rate: 250
    }
]

var gCanvas
var gCtx
var gBarWidth = 40

function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    gCtx.fillStyle = '#03a9f4'//'#e91e63'//'salmon'
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    drawCharts()
}

function drawCharts() {
    gCtx.fillStyle = '#3f51b5' // 'purple'
    // TODO: start from drawing a bar for single star
    // gCtx.fillRect(0, 0, gBarWidth, 100)//start from this then pos it lower
    // gCtx.fillRect(0, gCanvas.height - 100, gBarWidth, 100)// lower pos
    // gCtx.fillRect(200, gCanvas.height - 300, gBarWidth, 300)// other one for test

    // TODO: draw a bar for each star
    const startX = 60
    //adding x,y props to our model soo we can know the pos of the chart in the canvas
    gStars.forEach((star, idx) => {
        //start from this then show that we canot know if we clicked on a bar
        // then add x,y to the star
        // gCtx.fillRect(startX * idx, gCanvas.height - star.rate, gBarWidth, star.rate)
        star.x = startX * idx
        star.y = gCanvas.height - star.rate
        gCtx.fillRect(star.x, star.y, gBarWidth, star.rate)
    })
}

function canvasClicked(ev) {
    console.log('Click on me canvas');
    // TODO: find out if clicked a star bar
    const clickedStar = gStars.find(star => {
        //check if we clicked on a bar
        return (
            // offsetX/Y pos inside the element canvas
            ev.offsetX > star.x && ev.offsetX < star.x + gBarWidth &&
            ev.offsetY > star.y && ev.offsetY < star.y + star.rate
        )
    })
    // clientX/Y pos in the window
    if (clickedStar) openModal(clickedStar.name, clickedStar.rate, ev.clientX, ev.clientY)
    else closeModal()
}

function openModal(starName, starRate, x, y) {
    // TODO: open the modal with the given text in the given coordinates 
    const elModal = document.querySelector('.modal')
    elModal.innerText = `${starName} is ${starRate}% awesome`
    elModal.style.left = x + 'px'
    elModal.style.top = y + 'px'
    elModal.hidden = false
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.hidden = true
}