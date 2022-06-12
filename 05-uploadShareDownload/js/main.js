var gElCanvas;
var gCtx;

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
}


function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}



// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}
//                               callBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()
    //after we read the file
    reader.onload = function (event) {
        var img = new Image()// create a new html img element
        // Render on canvas // run the callBack func , to render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result // put the img src from the file we read
    }
    reader.readAsDataURL(ev.target.files[0]) // read the file we picked
}


function renderImg(img) {
    //draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

