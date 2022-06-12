var gCanvas;
var gCtx;

//this example soo security error/ problem

function init() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');

    // Check download in live server and not (work just in live server)
    // drawImgFromlocal()

    // Check download in live server and not (does not work)
    drawImgFromRemote()

}

function drawImgFromlocal() {
    var img = new Image()
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}

function drawImgFromRemote() {
    var img = new Image()
    img.src = 'https://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        console.log(img);
    }
}

function downloadCanvas(elLink) {
    //protect the image soo attacker could not download imgs from diff domain
    const data = gCanvas.toDataURL()// for security reason you can`t do toDataUrl on tainted canvas
    elLink.href = data
    elLink.download = 'my-img.jpg'
}