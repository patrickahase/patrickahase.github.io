/////////////////////////////////////// colour selection and wet/dry brush

let waterAmount = 0.5;
let dryAmount = 0.005;
let currentColour = "rgb(255, 255, 255)";

let paletteColourSelectors = document.getElementsByClassName("paletteColour");

let colourSelectorsArray = Array.from(paletteColourSelectors);

colourSelectorsArray.forEach(selector => {
  selector.addEventListener("click", addColour);
});

function addColour(e){
  let buttonClicked = e.target;
  let backgroundColour = getComputedStyle(buttonClicked).backgroundColor;
  currentColour = backgroundColour;
  let newAlphaColour = rgbaFromRGBString(backgroundColour, waterAmount);
  setBrushColour(newAlphaColour);
}

function dryingBrush(){
  //waterAmount = waterAmount - dryAmount;
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


/////////////////////////////////////// undo/redo

/* create empty arrays to hold our undo/redo states */
let undoStack = [];
let redoStack = [];

/* save our current (original) state */
/* this is currently set up for the canvas image, so its going to use toDataURL() on the canvas */
/* if you were using this for another type of saved data, such as an object, you would need to change this out */
let currentState = canvas.toDataURL();

/* create a limit for undo/redo amount */
let maxUndo = 2;

function saveUndoState(){
  /* if the undoStack has hit the limit then remove the first item from the list */
  /* if you want unlimited undo remove them following three lines */
  if(undoStack.length === maxUndo){ 
    undoStack.shift();
  }
  /* before we update our current state - add the old version to our undoStack */
  undoStack.push(currentState);
  /* this is where find and update our actual current state */
  /* this is currently set up for the canvas image, so its going to use toDataURL() on the canvas */
  /* if you were using this for another type of saved data, such as an object, you would need to change this out */
  currentState = canvas.toDataURL();
  /* then we reset our redoStack as we've made a new change and we can't redo from there */
  redoStack = [];
}

/* this restores our previous state */
function restoreUndoState(){
  /* check if there's any undo states */
  if(undoStack.length > 0){
    /* send the currentState to the redoStack */
    redoStack.push(currentState);
    /* retrieve the undo state from the undoStack */
    let newState = undoStack.pop();
    /* update the currentState variable */
    currentState = newState;
    /* then draw to canvas */
    drawDataURLToCanvas(newState);
  }
}

/* this restores our state from the redo stack */
function restoreRedoState(){
  /* check if there's any redo states */
  if(redoStack.length > 0){
    /* send the currentState to the undoStack */
    undoStack.push(currentState);
    /* retrieve the redo state from the redoStack */
    let newState = redoStack.pop();
    /* update the currentState variable */
    currentState = newState;
    /* then draw to canvas */
    drawDataURLToCanvas(newState);
  }
}

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

document.getElementById("undoBtn").addEventListener("click", () => {
  restoreUndoState();
});

document.getElementById("redoBtn").addEventListener("click", () => {
  restoreRedoState();
});

/////////////////////////////////////// save canvas as file

function downloadCanvasImage(dataURL, fileName){
  /* create an <a> element */
  let downloadLink = document.createElement("a");
  /* set its href and download attributes */
  downloadLink.href = dataURL;
  downloadLink.download = fileName;
  /* simulate clicking the link */
  downloadLink.click();
  /* remove element once we're done */
  downloadLink.remove();
} 

document.getElementById("saveBtn").addEventListener("click", () => {
  /* save canvas image as dataURL */
  let canvasCapture = canvas.toDataURL();
  /* define name of file */
  let downloadName = "myImage";
  /* feed into download function */
  downloadCanvasImage(canvasCapture, downloadName);
});