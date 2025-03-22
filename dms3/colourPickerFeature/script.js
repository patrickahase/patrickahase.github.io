/* this line creates a new variable named colourSquare by using the let keyword */
/* it then sets that variable to the div from our HTML */
/* it does this by searching the document for any element that has the id "colour-square" */
/* now whenever we refer to colourSquare we know it means the div element */
let colourSquare = document.getElementById("colour-square");

/* the below is a function to change the colour of our div */
/* its created using the function keyword, followed by a name, then parentheses with a parameter */
/* then some curly brackets which contain the code to run when its called via name */
function setSquareColour(newColour){
    
    /* this is some built in error checking */
    /* we create a new variable and set it to 'black' as we know that its a supported colour value */
    let validColour = 'hsl(100, 100%, 50%)';

   

    /* this then check if the newColour is a valid colour value */
    /* if it is it changes validColour from 'black' to newColour */
    /* if it isn't it doesn't do anything - so validColour remains 'black' */
    if(CSS.supports('color', newColour)){
        validColour = newColour;
        console.log(validColour);
    }

    /* finally we set the backgroundColor style of colourSquare to the validColour */
    colourSquare.style.backgroundColor = validColour;

}

/* below is an example call to the function : because its just in the script it'll run when the page is loaded */
setSquareColour('red');

let colourPicker = document.getElementById("colour-picker");

colourPicker.addEventListener("input", pickingColour);

function pickingColour(e){
  setSquareColour(e.target.value);
}

function numberToHSL(num){
  return `hsl(${num}, 100%, 50%)`;
  let nexMix = `color-mix(in hsl, red ${num}%, blue ${100-num})`;
}

setSquareColour(numberToHSL(100));



let para = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


let datePicker = document.getElementById("date-picker");

datePicker.addEventListener("change", (e) => {
  let chosenDate = new Date(e.target.value);
  let UTC = Date.UTC(
    chosenDate.getFullYear(),
    chosenDate.getMonth(),
    chosenDate.getDate()
  );
  let newCol = numberToHSL(UTC%360);
  setSquareColour(newCol);
  console.log(newCol);
});

let foundElementUnique = document.getElementsByClassName("unique");
let foundElementMany = document.getElementsByClassName("many");

console.log(foundElementUnique);
console.log(foundElementMany);
console.log(colourSquare);
