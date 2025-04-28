/////
// Using the Math.random() is the built in way to generate randomness with JS
// It creates a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/////

document.getElementById("basicRandomBtn").addEventListener("click", basicRandomGen);

let basicRandomResult = document.getElementById("basicRandomSpan");

function basicRandomGen(){
  /* here we're simply setting the appropriate element's content to the output of Math.random() */
  basicRandomResult.innerHTML = Math.random();
}

/////
// We can use one of the helper functions we've looked at preciously to shift the range of our random number
/////

document.getElementById("randomRangeBtn").addEventListener("click", randomRangeGen);

let randomRangeResult = document.getElementById("randomRangeSpan");

/* here we're setting the range as separate variables, this is mostly for ease of access */
let minRandom = 5;
let maxRandom = 10;

function randomRangeGen(){
  /* first we're finding our random number */
  let randomNumber = Math.random();
  /* then we're setting the appropriate element's content to the output of a remapRange() */
  /* we're feeding it our random number, its range (which we know is 0 - 1), and then our output range */
  randomRangeResult.innerHTML = remapRange(randomNumber, 0, 1, minRandom, maxRandom);
}

/////
// If we want to find a whole number within a range (called an Int) we can use the above process
// and then round the result - !watch for the slight change in the range calculation
/////

document.getElementById("randomIntRangeBtn").addEventListener("click", randomIntRangeGen);

let randomIntRangeResult = document.getElementById("randomIntRangeSpan");

/* here we're setting the range as separate variables, this is mostly for ease of access */
let minIntRandom = 0;
let maxIntRandom = 5;

function randomIntRangeGen(){
  /* first we're finding our random number */
  let randomNumber = Math.random();
  /* next we're finding the random number as a float using remapRange */
  /* we're feeding it our random number, its range (which we know is 0 - 1), and then our output range */
  /* note that we're doing some additional maths to our output range - this is because we're rounding our result */
  /* when rounding using JS we can use Math.ceil() which rounds up or Math.floor() which rounds down */
  /* in this case because we're rounding up we need to - 1 off the minimum, otherwise we'd never actually return 0 */
  /* any result within the range of 0 - 1 would be rounded up to 1, so we modify the range to make a result of -1 - 0 more likely */
  let randomFloatInRange = remapRange(randomNumber, 0, 1, minIntRandom - 1, maxIntRandom);
  /* finally we're setting the appropriate element's content to the output of our Math.ceil */
  /* and we're feeding it our about random float */
  randomIntRangeResult.innerHTML = Math.ceil(randomFloatInRange);
}

/////
// While the pseudo-random distribution of Math.random() is approximately uniform what if we want to stop repeated rolls?
/////

document.getElementById("randomNonRepIntRangeBtn").addEventListener("click", randomNonRepIntRangeGen);

let randomNonRepIntRangeResult = document.getElementById("randomNonRepIntRangeSpan");
let lastRandomNonRepIntRangeResult = document.getElementById("lastRandomNonRepIntRangeSpan");

/* here we're setting the range as separate variables, this is mostly for ease of access */
let minNonRepIntRandom = 2;
let maxNonRepIntRandom = 8;
/* we're also setting up a global variable to store our random number : similar to the idea of state we discussed in week 7 */
let currentRandom;

function randomNonRepIntRangeGen(){
  /* first we're finding our random number */
  let randomNumber = Math.random();
  /* next we're doing all of the previous functions calculation in a single line */
  let randomResult = Math.ceil(remapRange(randomNumber, 0, 1, minNonRepIntRandom - 1, maxNonRepIntRandom));
  /* but before we set our element's content we need to see if this is the same result as last time */
  /* we do this by using an if statement comparing the two variables */
  if (randomResult === currentRandom){
    /* if they are the same, we know we have a repeat, in which case we don't want to reroll our random number */
    /* we do this by calling the function again from within itself */
    /* because an if is branching code, if the below runs, the following lines will not run */
    randomNonRepIntRangeGen();
  } else {
    /* this is the branch if the two variables are different */
    /* the below three lines is another if statement : this is only to provide the text feedback on the page and wouldn't typically be required */
    if(currentRandom){
      lastRandomNonRepIntRangeResult.innerHTML = currentRandom;
    }
    /* next we're setting the appropriate element's content to randomResult */
    randomNonRepIntRangeResult.innerHTML = randomResult;
    /* and finally we're updating our stored state to represent our current value */
    currentRandom = randomResult;
  }  
}

/////
// Now that we can get a random Int within a range we can use it to do other random things
// Let's first pick a random entry from an array, which in this case is a list of colour names
/////

document.getElementById("randomFromListBtn").addEventListener("click", randomListSelect);

let randomFromListResult = document.getElementById("randomFromListSpan");

/* define the array we want to pick from, this is just some string values, but could be anything */
let listForRandomPick = [
  "lightsalmon",
  "tomato",
  "peachpuff",
  "olive",
  "plum"
];

/* this is just for demonstration purposes, we're setting the appropriate element's content our list */
let listForRandom = document.getElementById("listForRandomSpan");
listForRandom.innerHTML = listForRandomPick;

function randomListSelect(){
  /* first we're finding our random number */
  let randomNumber = Math.random();
  /* while we could do a similar trick to our previous examples to find an int within a range, because we're basing this of an existing array we can simplify it */
  /* we can easily remap the range because we know it'll be between 0 and the length of the array : as we discussed with arrays they start from 0 */
  /* this time we're rounding the number down using Math.floor() */
  /* we don't need to account for the modified range like last time, because array.length always returns the last selector + 1 */
  let randomSelector = Math.floor(listForRandomPick.length * randomNumber);
  /* then we're setting the appropriate element's content to a value selected from the array using the above number */
  randomFromListResult.innerHTML = listForRandomPick[randomSelector];
}

/////
// For our next trick we're going to do the above, but make sure we don't repeat anything until the list is run through
/////

document.getElementById("randomFromListCycleBtn").addEventListener("click", randomListCycleSelect);

let randomFromListCycleResult = document.getElementById("randomFromListCycleSpan");

/* define the array we want to pick from, this is just some string values, but could be anything */
let listForRandomCyclePick = [
  "lightsalmon",
  "tomato",
  "peachpuff",
  "olive",
  "plum"
];
/* we also want to create a copy of the above array : this will be the one we work with */
/* if we do this we can restore back to our original array when we finish cycling through */
/* if we just wrote: */
// let workingListForRandomCyclePick = listForRandomCyclePick;
/* it would make both listForRandomCyclePick and workingListForRandomCyclePick refer to the same array */
/* we have to use a spread operator to do this instead */
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax */
let workingListForRandomCyclePick = [...listForRandomCyclePick];

/* this is just for demonstration purposes, we're setting the appropriate element's content our working list */
let listForRandomCycle = document.getElementById("listForRandomCycleSpan");
listForRandomCycle.innerHTML = workingListForRandomCyclePick;

function randomListCycleSelect(){
  /* first we're finding our random number */
  let randomNumber = Math.random();
  /* then we need to check if we've already cycled through our whole array : if so it's length will be 0 */
  if(workingListForRandomCyclePick.length === 0){
    /* if the array is empty we reset it using our original array */
    workingListForRandomCyclePick = [...listForRandomCyclePick];
  }
  /* we're finding our random item much as above, though remember we're using the working array */
  let randomSelector = Math.floor(workingListForRandomCyclePick.length * randomNumber);
  /* next instead of just finding our item from the array, we're going to remove it using the splice() method */
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice */
  /* splice can remove or replace multiple items, in our case we want the item at randomSelector's value, and we only want 1 item */
  let randomResult = workingListForRandomCyclePick.splice(randomSelector, 1);
  /* then we're setting the appropriate element's content to our item */
  /* splice returns an array with our item/s, even though we only found a single item it's still stored in an array so we find it using 0 */  
  randomFromListCycleResult.innerHTML = randomResult[0];
  /* finally for demonstration purposes we're updating the feedback of the working list */
  listForRandomCycle.innerHTML = workingListForRandomCyclePick;
}

/////
// Finally let's look at weighting random through probability, we can set percentages for a binary choice and stack a list
/////

document.getElementById("randomProbBtn").addEventListener("click", randomColourChance);

/* here's where we set the probability, which in this case is 20% (as a fraction of 1) */
let chanceOfBlue = 0.2;

/* as we want to apply the colour change to the button we're sending a reference of it via the event (e) */
function randomColourChance(e){
  /* first we're finding our random number */
  let randomNumber = Math.random();
  let thisButton = e.target;
  /* we can use an if() statement to find out if our random number is less than 0.2 */
  if(randomNumber < chanceOfBlue){
    thisButton.style.backgroundColor = "#00d4ff"
  } else {
    /* this part is run if the random number isn't less than 0.2 ie its greater than 0.2 */
    thisButton.style.backgroundColor = "#d61406"
  }
}

document.getElementById("randomFromListProbBtn").addEventListener("click", randomListProbSelect);

let randomFromListProbResult = document.getElementById("randomFromListProbSpan");

/* define the array we want to pick from, this is just some string values, but could be anything */
/* note there's multiple tomato entries, making it more likely to be picked */
let listForRandomProbPick = [
  "lightsalmon",
  "tomato",
  "tomato",
  "tomato",
  "peachpuff",
  "olive",
  "plum"
];

/* this is just for demonstration purposes, we're setting the appropriate element's content our working list */
let listForRandomProb = document.getElementById("listForRandomProbSpan");
listForRandomProb.innerHTML = listForRandomProbPick;

function randomListProbSelect(){
  /* first we're finding our random number */
  let randomNumber = Math.random();
  /* we're finding our random item much as the previous examples */
  let randomSelector = Math.floor(listForRandomProbPick.length * randomNumber);
  /* then we're setting the appropriate element's content to our item */
  randomFromListProbResult.innerHTML = listForRandomProbPick[randomSelector];
}


///////////////////////////////////////////////////////////////////////////////////////////

/* helper functions */

/* takes a number value and limits it to the min-max range */
function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}
// clamp(-12 , 0, 10) will return 0
// clamp(12 , 0, 10) will return 10
// clamp(7 , 0, 10) will return 7


/* takes a number value within a given range and maps it to another range */
function remapRange(value, min1, max1, min2, max2){
  return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}
// eg: I want to convert the cursor'x x position into a hue value
// if my window is 768px wide, my cursor's possible range is 0 - 768
// a hue value has a range of 0 - 360
// i could run remapRange(mouseXPos, 0, 768, 0, 360) which would remap the ranges
// eg if my mouse is halfway across the screen, where mouseXPos would equal 384, the 
// above function would return 180 as it's halfway through the second range


/* takes a single number value and returns a hsl colour value */
/* saturation and lightness are set to a default but this can be changed */
function hslFromHue(hue){
  let saturation = 100;
  let lightness = 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

/* function copyright Inigo Quilez on MIT License https://www.shadertoy.com/view/XlXcW4 */
/* 

vec3 hash33( uvec3 x )
{
    x = ((x>>8U)^x.yzx)*k;
    x = ((x>>8U)^x.yzx)*k;
    x = ((x>>8U)^x.yzx)*k;
    
    return vec3(x)*(1.0/float(0xffffffffU));
}
*/