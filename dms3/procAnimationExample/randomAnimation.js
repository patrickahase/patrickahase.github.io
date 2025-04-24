// variables defined in konvaSetup
// stage : stage element
// layer : first layer

/////
// This example takes the last example adds a random target
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

document.getElementById("circleAdd").addEventListener("click", addCircle);

/* add circle when button clicked */
function addCircle(){
 let newCircle = new Konva.Circle(circleSettings);
 layer.add(newCircle);
 /* here's where we trigger the animation */
 /* it takes in newCircle, as it need to know what to apply the animation to */
 tweenToRandLocation(newCircle);
}

/* instead of defining duration we set a speed multiplier */
/* as we don't know the distance each animation will travel we need to calculate it */
/* and then apply the multiplier : this way speed is the same if it's moving 2px or 200px */
let speedMult = 100;

function tweenToRandLocation(node){
  /* for our distance calculation we need to know what our current position is */
  let currentPos = [node.x(), node.y()];
  /* and where we're travelling to : see function below for more detail */
  let newPos = setRandomTargetPosition();
  /* then we plug both into findDistance() which returns a number */
  let dist = findDistance(currentPos, newPos);
  /* then we do the same as last time */
  /* note that the x,y properties are both set, and they're based on the newPos value */
  /* also instead of creating two functions we can just trigger this one again */
  /* each time this function runs it'll create a new random number, making a new random position */
  let newTween = new Konva.Tween({
    node: node,
    duration: dist / speedMult,
    x: newPos[0],
    y: newPos[1],
    easing: Konva.Easings.Linear,
    onFinish: () => {tweenToRandLocation(node)}
  });
  /* once we've created the tween animation we make it start by calling play() */
  newTween.play();
}

///////////////////

function setRandomTargetPosition(){
  /* this calculates a new random position using some of the logic we saw in the last example */
  /* in this case we know the upper end of our range is the total width/height of the stage */
  /* we're also adding the radius so it won't go off the side */
  let newX = circleSettings.radius + Math.floor(Math.random() * (stage.width() - circleSettings.radius));
  let newY = circleSettings.radius + Math.floor(Math.random() * (stage.height() - circleSettings.radius));
  return [newX, newY];
}

function findDistance(currentPos, newPos){
  /* this is some vector math to calculate distance between two points */
  let xDif = currentPos[0] - newPos[0];
  let yDif = currentPos[1] - newPos[1];
  let dist = Math.sqrt(xDif*xDif + yDif*yDif);
  return dist;
}