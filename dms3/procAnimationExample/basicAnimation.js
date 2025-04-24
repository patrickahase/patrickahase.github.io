// variables defined in konvaSetup.js
// stage : stage element
// layer : first layer

/////
// This example is just setting up a predefined animation of a circle from left to right
/////

/* define circle settings */
let circleSettings = {
  x: 0,
  y: stage.height() / 2,
  radius: stage.width() / 10,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 3
}

document.getElementById("circleAdd").addEventListener("click", addCircle);

/* add circle when button clicked */
function addCircle(){
 let newCircle = new Konva.Circle(circleSettings);
 layer.add(newCircle);
 /* here's where we trigger the animation */
 /* it takes in newCircle, as it need to know what to apply the animation to */
 tweenLeftRight(newCircle);
}

/* we're defining the duration outside the function for ease of access */
let animDuration = 1;

function tweenLeftRight(node){
  /* this is creating the animation */
  /* it's pretty self explanitory */
  /* node : what to add it to */
  /* duration */
  /* we can animate a lot of different properties, in this case we're animating x */
  /* that means we just pass in what our x end result should be */
  /* finally we're adding an easing setting : see below for reference */
  /* https://konvajs.org/docs/tweens/Common_Easings.html */
  let newTween = new Konva.Tween({
    node: node,
    duration: animDuration,
    x: stage.width(),
    easing: Konva.Easings.Linear,
  });
  /* once we've created the tween animation we make it start by calling play() */
  newTween.play();
}