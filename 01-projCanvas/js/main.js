var gCanvas;
var gCtx;
var gCurrShape = 'triangle';

function init() {
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');

  //can use numbers 1-13 for the examples
  drawLine(10, 10, 130, 230)
  // drawTriangle(50, 250)
  // drawRect(250, 30)
  // clearCanvas()
  // drawArc(330, 310);
  // drawText('HOLA!', 10, 50)
  // saveAndRestoreExample()
  // drawImg()
  // drawImg2()
  // resizeCanvas()
  //   window.addEventListener('resize', resizeCanvas)
  // click on canvas
}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
  gCtx.lineWidth = 2;
  gCtx.moveTo(x, y);
  gCtx.lineTo(xEnd, yEnd);
  gCtx.strokeStyle = 'red';
  gCtx.stroke();
}

function drawTriangle(x, y) {
  gCtx.beginPath();//Starts a new path -> Call this method when you want to create a new path.
  gCtx.lineWidth = 2;
  gCtx.moveTo(x, y);//Moves the starting point of a new sub-path to the (x, y) coordinates.
  gCtx.lineTo(130, 330);//Connects the last point in the current sub-path to the specified (x, y) coordinates with a straight line.
  gCtx.lineTo(50, 370);
  /* 
  Causes the point of the pen to move back to the start of the current sub-path.
   It tries to draw a straight line from the current point to the start.
    If the shape has already been closed or has only one point,
     this function does nothing.
  */
  gCtx.closePath();
  gCtx.lineTo(x, y);
  gCtx.fillStyle = 'purple';//Color or style to use inside shapes. Default #000 (black).
  gCtx.fill();//Fills the current sub-paths with the current fill style.
  gCtx.strokeStyle = 'blue';//Color or style to use for the lines around shapes. Default #000 (black).
  gCtx.stroke();//Strokes the current sub-paths with the current stroke style.
  gCtx.closePath();
}

function drawRect(x, y) {
  gCtx.beginPath();
  gCtx.rect(x, y, 150, 150);
  gCtx.fillStyle = 'orange';
  gCtx.fillRect(x, y, 150, 150);
  gCtx.strokeStyle = 'black';
  gCtx.stroke();
}

function drawArc(x, y) {
  gCtx.beginPath();
  gCtx.lineWidth = 6;
  //the x,y cords of the center , The radius of the circle, The starting angle, The ending angle, in radians
  gCtx.arc(x, y, 100, 0, 2 * Math.PI);//use to create a circle //Adds a circular arc to the current path.
  gCtx.strokeStyle = 'white';
  gCtx.stroke();
  gCtx.fillStyle = 'blue';
  gCtx.fill();
}

function drawText(text, x, y) {
  // gCtx.font = '48px serif';
  // gCtx.fillText(text, x, y);

  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'brown';
  gCtx.fillStyle = 'black';
  gCtx.font = '40px Arial';
  gCtx.fillText(text, x, y);//Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y);//Draws (strokes) a given text at the given (x, y) position.
}

function saveAndRestoreExample() {
  gCtx.font = '30px Arial';
  gCtx.strokeStyle = 'green';
  gCtx.strokeText('Saving the context', 10, 50);
  gCtx.save();//Saves the current drawing style state using a stack.
  gCtx.strokeStyle = 'black';
  gCtx.strokeText('Switching to something else', 10, 100);
  gCtx.restore();//Restores the drawing style state to the last element on the 'state stack' saved by save().
  gCtx.strokeText('Back to previous context', 10, 150);
}

function clearCanvas() {
  //Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height)
  // to transparent black, erasing any previously drawn content.
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  // You may clear part of the canvas
  // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
}

function drawImg() {
  var elImg = document.querySelector('img');
  // Naive approach:
  // there is a risk that image is not loaded yet and nothing will be drawn on canvas
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);//Draws the specified image
}

function drawImg2() {
  var img = new Image();//create a new html img element
  img.src = 'img/1.jpg';//send a network req to get that image, define the img src
  //when the image ready draw it on the canvas
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  };
}

function downloadCanvas(elLink) {
  //gets the canvas content and convert it to base64 data URL that can be save as an image
  const data = gCanvas.toDataURL();//method returns a data URL containing a representation of the image in the format specified by the type parameter.
  console.log('data', data);//decoded the image to base64 
  elLink.href = data;//put it on the link
  elLink.download = 'puki';//can change the name of the file
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  // Note: changing the canvas dimension this way clears the canvas
  gCanvas.width = elContainer.offsetWidth - 20;
  // Unless needed, better keep height fixed.
  //   gCanvas.height = elContainer.offsetHeight
}

function setShape(shape) {
  gCurrShape = shape;
}

function draw(ev) {
  const offsetX = ev.offsetX;
  const offsetY = ev.offsetY;
  // console.log(offsetX,offsetY)
  // const { offsetX, offsetY } = ev
  switch (gCurrShape) {
    case 'triangle':
      drawTriangle(offsetX, offsetY);
      break;
    case 'rect':
      drawRect(offsetX, offsetY);
      break;
    case 'text':
      drawText('Hello', offsetX, offsetY);
      break;
    case 'line':
      drawLine(offsetX, offsetY);
      break;
  }
}
