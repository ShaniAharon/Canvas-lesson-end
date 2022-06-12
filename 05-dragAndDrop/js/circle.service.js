var gCircle

function createCircle(pos) {
    gCircle = {
        pos,
        size: 60,
        color: 'blue',
        isDrag: false
    }
}

function getCircle() {
    return gCircle
}

//check if the click is inside the circle 
function isCircleClicked(clickedPos) {
    const { pos } = gCircle
    // calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //if its smaller then the radius of the circle were inside
    return distance <= gCircle.size
}


function setCircleDrag(isDrag) {
    gCircle.isDrag = isDrag
}

//move the circle in a delta, diff from the pervious pos
function moveCircle(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy

}

