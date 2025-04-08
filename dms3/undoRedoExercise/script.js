let waterAmount = 0.5;
let dryAmount = 0.005;
let currentColour = "rgb(255, 255, 255)";

document.getElementById("palette01").addEventListener("click", addColour);
document.getElementById("palette02").addEventListener("click", addColour);
document.getElementById("palette03").addEventListener("click", addColour);
document.getElementById("palette04").addEventListener("click", addColour);
document.getElementById("palette05").addEventListener("click", addColour);
document.getElementById("palette06").addEventListener("click", addColour);
document.getElementById("palette07").addEventListener("click", addColour);
document.getElementById("palette08").addEventListener("click", addColour);


function addColour(e){
  let buttonClicked = e.target;
  let backgroundColour = getComputedStyle(buttonClicked).backgroundColor;
  currentColour = backgroundColour;
  let newAlphaColour = rgbaFromRGBString(backgroundColour, waterAmount);
  setBrushColour(newAlphaColour);
}

function dryingBrush(){
  waterAmount = waterAmount - dryAmount;
  let newColour = rgbaFromRGBString(currentColour, waterAmount);
  setBrushColour(newColour);
}

document.getElementById("waterCupMouth").addEventListener("click", () => {
  waterAmount = 1;
});

/* expects an rgb() string and a=n alpha value as a number */
function rgbaFromRGBString(rgbString, newAlpha){
  /* first we need to get the number values from our string */
  /* the below will return an array with our seperate r,g,b values */
  let colours = rgbString.match(/\d+/g);
  /* then we need to turn this, plus our alpha number into an rgba() string */
  /* below uses template literals to make short script */
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals */
  let newRGBAString = `rgba(${colours[0]}, ${colours[1]}, ${colours[2]}, ${newAlpha})`;
  /* finally return this new string */
  return newRGBAString;
}

function setBrushColour(newColour){
  ctx.strokeStyle = newColour;
}


///////////////////////////////////////

/* we created our canvas in konvaSetup.js and called it canvas */

document.getElementById("undoBtn").addEventListener("click", () => {
  
  drawDataURLToCanvas(prevState);
});

document.getElementById("redoBtn").addEventListener("click", () => {

});

//
let prevState;
//

document.getElementById("saveBtn").addEventListener("click", () => {
  let canvasCapture = canvas.toDataURL();
  /* remember to comment or delete below if using in production */
  //console.log(canvasCapture);
  ///
  prevState = canvasCapture;
  ///
});

function drawDataURLToCanvas(imgDataURL){
  /* create img element */
  let img2Draw = new Image();
  /* create an event listener to trigger on src loading */
  img2Draw.addEventListener("load", function drawOnLoad(){
    /* clear what's already on the canvas */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* draw the img using the canvas context - ctx is created in konvaSetup.js */
    /* the two 0s are the x and y position */
    ctx.drawImage(img2Draw, 0, 0);
    /* we have to then redraw the konva layer manually */
    layer.batchDraw();
    /* stop listening for the load event on this element */
    img2Draw.removeEventListener("load", drawOnLoad);
    /* get rid of this element */
    img2Draw.remove();
  });
  /* give the element a source, kicking off the event listener */
  img2Draw.src = imgDataURL;  
}
