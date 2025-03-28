/* find custom colours */
let bodyStyles = window.getComputedStyle(document.body);
let col01 = bodyStyles.getPropertyValue('--col01');
let col02 = bodyStyles.getPropertyValue('--col02');

/* set up stage */
let stage = new Konva.Stage({
  container: 'stageContainer',
  width: window.innerWidth * 0.8,
  height: window.innerWidth * 0.25
});

/////////////////////////////////////////////////////// Group 1 Drawing Canvas
// see week 4's mappingExercise for commented version

let layerOne = new Konva.Layer();
stage.add(layerOne);

let groupOne = new Konva.Group();

let backgroundRectOne = new Konva.Rect({
  x: 0,
  y: 0,
  width: window.innerWidth * 0.25,
  height: stage.height(),
  fill: col01,
  stroke: col02,
  strokeWidth: 2
});

const canvas = document.createElement('canvas');
canvas.width = backgroundRectOne.width();
canvas.height = backgroundRectOne.height();

const image = new Konva.Image({
  image: canvas,
  x: 0,
  y: 0
});

const ctx = canvas.getContext('2d');
ctx.strokeStyle = col02;
ctx.lineJoin = "round";
ctx.lineWidth = 1;
let isPainting = false;
let lastPointerPos;
let mode = 'brush';

function draw(){
  if(mode === 'brush'){
      ctx.globalCompositeOperation = 'source-over';
  }

  if(mode === 'eraser'){
      ctx.globalCompositeOperation = 'destination-out';
  }
  
  ctx.beginPath();
  const localPos = {
      x: lastPointerPos.x - image.x(),
      y: lastPointerPos.y - image.y()
  };
  ctx.moveTo(localPos.x, localPos.y);

  const pos = stage.getPointerPosition();
  const newLocalPos = {
      x: pos.x - image.x(),
      y: pos.y - image.y()
  };
  ctx.lineTo(newLocalPos.x, newLocalPos.y);
  ctx.closePath();
  ctx.stroke();

  lastPointerPos = pos;

  layerOne.batchDraw();
}
image.on('mousedown', () => {
  isPainting = true;
  lastPointerPos = stage.getPointerPosition();
  stage.on('mousemove', draw);
});
document.addEventListener("mouseup", () => {
  isPainting = false;
  stage.off('mousemove', draw);
});

groupOne.add(backgroundRectOne);
groupOne.add(image);
layerOne.add(groupOne);

/* turn off cursor */
groupOne.on('mouseover', (e) => {
  e.target.getStage().container().style.cursor = 'none';
});
groupOne.on('mouseout', (e) => {
  e.target.getStage().container().style.cursor = 'default';
});

/* 2 */

let groupTwo = new Konva.Group();

let backgroundRectTwo = new Konva.Rect({
  x: stage.width() / 2 - window.innerWidth * 0.125,
  y: 0,
  width: window.innerWidth * 0.25,
  height: stage.height(),
  fill: col01,
  stroke: col02,
  strokeWidth: 2
});

let circle = new Konva.Circle({
  x: stage.width() / 2,
  y: backgroundRectTwo.height() / 2,
  radius: backgroundRectTwo.width() / 3,
  fill: col01,
  stroke: col02,
  strokeWidth: 4,
  draggable: true
});

document.getElementById("cacheButton").addEventListener("click", () => {
  groupTwo.cache();
});

groupTwo.add(backgroundRectTwo);
groupTwo.add(circle);
groupTwo.cache();
layerOne.add(groupTwo);

/* 3 */

let groupThree = new Konva.Group();

let backgroundRectThree = new Konva.Rect({
  x: stage.width() - window.innerWidth * 0.25,
  y: 0,
  width: window.innerWidth * 0.25,
  height: stage.height(),
  fill: col01,
  stroke: col02,
  strokeWidth: 2
});

let crossCursor = new Konva.Star({
  x: stage.width() - window.innerWidth * 0.125,
  y: stage.height() / 2,
  numPoints: 4,
  innerRadius: 0,
  outerRadius: 12,
  stroke: col02,
  strokeWidth: 2
});

/* turn off cursor */
groupThree.on('mouseover', (e) => {
  e.target.getStage().container().style.cursor = 'none';
});
groupThree.on('mouseout', (e) => {
  e.target.getStage().container().style.cursor = 'default';
});

let cursorDelay = 0;

document.getElementById("cursorDelayInput").addEventListener("change", (e) => {
  cursorDelay = e.target.value;
});

backgroundRectThree.on("mousemove", (e) => {
  e.evt.preventDefault();
  const pos = stage.getPointerPosition();
  if(cursorDelay > 0){
    setTimeout(() => {
      crossCursor.position(pos);
    }, cursorDelay);
  } else {
    crossCursor.position(pos);
  }
});

groupThree.add(backgroundRectThree);
groupThree.add(crossCursor);
layerOne.add(groupThree);

/* let layerTwo = new Konva.Layer();
stage.add(layerTwo);
let layerThree = new Konva.Layer();
stage.add(layerThree); */




