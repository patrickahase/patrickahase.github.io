let myStage = new Konva.Stage({
  container: "konvaStage",
  width: 500,
  height: 500
});

let layerOne = new Konva.Layer();

let currentColour = 'red';

function addCircle(){
  let circle = new Konva.Circle({
    x: myStage.width() / 2,
    y: myStage.height() /2,
    radius: 70,
    fill: currentColour,
    draggable: true
  });
  layerOne.add(circle);
}

function changeCurrentColour(e){
  currentColour = e.target.value;
}

document.getElementById("addCircle").addEventListener("click", addCircle);

document.getElementById("circleColour").addEventListener("change", changeCurrentColour);

myStage.add(layerOne);