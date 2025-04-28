let waterAmount = 0.5;
let dryAmount = 0.008;
let currentColour = "rgb(255, 255, 255)";

document.getElementById("palette01").addEventListener("click", addColour);
document.getElementById("palette02").addEventListener("click", addColour);
document.getElementById("palette03").addEventListener("click", addColour);
document.getElementById("palette04").addEventListener("click", addColour);


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

