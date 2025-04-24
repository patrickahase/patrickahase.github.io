// variables defined in konvaSetup
// stage : stage element
// layer : first layer

let circleSettings = {
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: stage.width() / 10,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 3
}

function addCircle(){
 let newCircle = new Konva.Circle(circleSettings);
 layer.add(newCircle);
}

document.getElementById("circleAdd").addEventListener("click", addCircle);

let speed = 1;

function setRandomTargetPosition(){
  let newX = circleSettings.radius + Math.floor(Math.random() * (stage.width() - circleSettings.radius));
  let newY = circleSettings.radius + Math.floor(Math.random() * (stage.height() - circleSettings.radius));
  return [newX, newY];
}

function findDistance(prevPos, newPos){
  let xDif = prevPos[0] - newPos[0];
  let yDif = prevPos[1] - newPos[1];
  let dist = Math.sqrt(xDif*xDif + yDif*yDif);
  return dist;
}

function randomAnimateCircle(circle){
  let newPos = setRandomTargetPosition();
  let prevPos = [circle.x, circle.y];
  console.log(prevPos);
}