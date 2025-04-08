let arrayDisplay = document.getElementById("arrayDisplay");

let colourNameOne = "Bisque";
let colourNameTwo = "Coral";
let colourNameThree = "Cyan";
let colourNameFour = "Olive";

let colourNames = [];

arrayDisplay.innerHTML = colourNameOne;



let pickColBtn = document.getElementById("pickColour");

pickColBtn.addEventListener("click", pickColour);

function pickColour(){

}



let randColBtn = document.getElementById("randColour");

randColBtn.addEventListener("click", randomColour);

function randomColour(){

}



/* in a forEach loop the first parameter is the value, and the second is its index */
colourNames.forEach((colour) => {

});

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