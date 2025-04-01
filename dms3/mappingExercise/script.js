/* 
Mapping exercise :
Map controls from three different inputs onto the three different filters, each of which are implemented by the following three functions:
image.noise();
image.blurRadius();
image.pixelSize();
Each need a number input as an argument (inside the parentheses) : you'll need to experiment with what range of numbers work for you
You'll need to choose range and step on range input, and remap the preset range on the x & y controls
*/

let colourPalette1Input = document.getElementById("palette01");

colourPalette1Input.addEventListener("click", paletteColourChange);

let colourPalette2Input = document.getElementById("palette02");

colourPalette2Input.addEventListener("click", paletteColourChange);

let colourPalette3Input = document.getElementById("palette03");

colourPalette3Input.addEventListener("click", paletteColourChange);

let colourPalette4Input = document.getElementById("palette04");

colourPalette4Input.addEventListener("click", paletteColourChange);

function paletteColourChange(e){
  let newColour = getComputedStyle(e.target).backgroundColor;
  setBrushColour(newColour);
}

document.getElementById("range1").addEventListener("change", (e) => {
  image.blurRadius(10);
});



/* these two functions run whenever the x and y postition of the controller changes */
function newXValue(value){
    // value has a range of 0 - 100
    // can be remapped via the helper function
    console.log(value);
  let newRange = remapRange(value, 0, 100, 0, 100);
  console.log(newRange);
  image.pixelSize(newRange);
}

function newYValue(value){
    // value has a range of 0 - 100
    // can be remapped via the helper function
    //console.log(`yPos: ${value}`);
}

let colourPicker = document.getElementById("brushColourPicker");

colourPicker.addEventListener("change", (e) => {
  //e.target.value
  setBrushColour(e.target.value);
});



