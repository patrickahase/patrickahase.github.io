let background = "red";
let border = "4px solid white";
let widthRem = 15;
let heightRem = 15;

let setStyleBtn = document.getElementById("setStyle");

let setStyleSelect = document.getElementById("buttonStyles-select");

setStyleBtn.addEventListener("click", (e) => {
  setButtonStyle(e, background, border, widthRem, heightRem);
});

function setButtonStyle(e, newBackground, newBorder, newWidth, newHeight){
  let button = e.target;
  button.style.backgroundColor = newBackground;
  button.style.border = newBorder;
  button.style.width = newWidth + "rem";
  button.style.height = newHeight + "rem";
}

////////////////////////// helper functions

// random int
function getRandomIntRange(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// random float
function getRandomFloatRange(min, max){
  return Math.random() * (max - min) + min;
}