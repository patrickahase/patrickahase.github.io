// variables defined in konvaSetup
// stage : stage element
// layer : first layer

/////
// This example substitutes in some kind of user control event instead of a random position
// It's slightly more complex : before all we needed to know about is the individual circle
// but now we need to connect it to something external
/////

/* define circle settings */
let circleSettings = {
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: stage.width() / 10,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 3
}
/* to simplify things we're going to add the circle at the start */
/* if you wanted to be able to add them you'd need some way to store multiple references dynamically */
/* an array would probably be your best bet */
let newCircle = new Konva.Circle(circleSettings);
layer.add(newCircle);

/* find our two number inputs and then set their max to reflect stage size */
let xInput = document.getElementById("inputXPos");
xInput.max = stage.width();
let yInput = document.getElementById("inputYPos");
yInput.max = stage.height();

document.getElementById("animationTrigger").addEventListener("click", animateCircle);

/* instead of defining duration we set a speed multiplier */
/* as we don't know the distance each animation will travel we need to calculate it */
/* and then apply the multiplier : this way speed is the same if it's moving 2px or 200px */
let speedMult = 100;

/* add animation when button clicked */
function animateCircle(){
  /* while we're not randomly generating it we still want to know the distance */
  /* because we already have a reference to the circle as newCircle we don't need to pass it in and can use it instead of node */
  let currentPos = [newCircle.x(), newCircle.y()];
  /* find the input values and use for new position */
  let newPos = [xInput.value, yInput.value];
  /* then we plug both into findDistance() which returns a number */
  let dist = findDistance(currentPos, newPos);
  let newTween = new Konva.Tween({
    node: newCircle,
    duration: dist / speedMult,
    x: newPos[0],
    y: newPos[1],
    easing: Konva.Easings.EaseIn
  });
  /* once we've created the tween animation we make it start by calling play() */
  newTween.play();
}

///////////////////


function findDistance(currentPos, newPos){
  /* this is some vector math to calculate distance between two points */
  let xDif = currentPos[0] - newPos[0];
  let yDif = currentPos[1] - newPos[1];
  let dist = Math.sqrt(xDif*xDif + yDif*yDif);
  return dist;
}