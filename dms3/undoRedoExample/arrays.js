let arrayDisplay = document.getElementById("arrayDisplay");

let colourNameOne = "Bisque";
let colourNameTwo = "Coral";
let colourNameThree = "Cyan";
let colourNameFour = "Olive";

let colourNames = [
  "Bisque",
  "Coral",
  "Cyan",
  "Olive",
  "Cyan",
  "Olive",
  "Cyan",
  "Olive",
  "Cyan",
  "Olive"
];
if(colourNames.length > 1){
  for (let i = 1; i < colourNames.length; i++) {
    let element1 = colourNames[i];
    let element2 = colourNames[i-1];
    line1.remove()
    console.log(element1);
    console.log(element2);
  }
}


colourNames.push("Red");

arrayDisplay.innerHTML = colourNames;



let pickColBtn = document.getElementById("pickColour");

pickColBtn.addEventListener("click", pickColour);

function pickColour(){
  arrayDisplay.innerHTML = colourNames[0];
}



let randColBtn = document.getElementById("randColour");

randColBtn.addEventListener("click", randomColour);

function randomColour(){
  let randomNumber = getRandomIntRange(0, colourNames.length-1);
  arrayDisplay.innerHTML = colourNames[randomNumber];
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