/* brush texture from: https://www.onlygfx.com/8-watercolor-brush-texture-png-transparent/ */
/* technique from https://web.archive.org/web/20190113115756/http://www.tricedesigns.com/2012/01/04/sketching-with-html5-canvas-and-brush-images/ */
/* and from https://medium.com/@mpias/html-canvas-how-to-colorize-a-sprite-3150195021bf */
/* set up stage and layer */
let stage = new Konva.Stage({
    container: 'stageContainer',
    width: 500,
    height: 500
});

let layer = new Konva.Layer();
stage.add(layer);

/* set up canvas element */
const canvas = document.createElement('canvas');
canvas.width = stage.width();
canvas.height = stage.height();

/////////////////////////////////////////////////////// Drawing Canvas

/* create image that references canvas */
const image = new Konva.Image({
    image: canvas,
    x: 0,
    y: 0
});
layer.add(image);

const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'source-over';
let brushImage = new Image();
brushImage.src = "./assets/watercolor-brush-texture-3-scale.png";
brushImage.onload = () => {
  const colImg = colourize(brushImage, 1, 0, 0);
}

let halfBrushW = brushImage.width/2;
let halfBrushH = brushImage.height/2;


/* maybe don't need */
/* ctx.strokeStyle = "rgba(255, 255, 255, 0)";
ctx.lineJoin = "round";
ctx.lineWidth = 5; */

/* set up drawing state */
let isPainting = false;
let lastPointerPos;
let mode = 'brush';

/* now we need to do some event handling */
/* this is similar to how addEventListener works but slightly different for Konva */
/* see : https://konvajs.org/docs/events/Binding_Events.html */
/* we'll also handle the drawing function a little different */
/* rather than always listening on the stage we'll instead add and remove with mousedown and mouseup */
/* first we need to define the drawing function */

function draw(){
    /* if(mode === 'brush'){
        ctx.globalCompositeOperation = 'source-over';
    }

    if(mode === 'eraser'){
        ctx.globalCompositeOperation = 'destination-out';
    } */
    
    //ctx.beginPath();
    const localPos = {
        x: lastPointerPos.x - image.x(),
        y: lastPointerPos.y - image.y()
    };
    //ctx.moveTo(localPos.x, localPos.y);

    const pos = stage.getPointerPosition();
    const newLocalPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y()
    };
    let dist = parseInt(Trig.distBtwn2Points(localPos, newLocalPos));
    let angle = parseInt(Trig.angleBtwn2Points(localPos, newLocalPos));

    let x,y;
    for (let i = 0; (i <= dist || i == 0); i++){
        x = localPos.x + (Math.sin(angle) * i) - halfBrushW;
        y = localPos.y + (Math.cos(angle) * i) - halfBrushH;
        ctx.globalAlpha = waterAmount;
        ctx.drawImage(brushImage, x, y);
    }
    //ctx.lineTo(newLocalPos.x, newLocalPos.y);
    //ctx.closePath();
    //ctx.stroke();

    lastPointerPos = pos;

    if (waterAmount >= 0.005){
      waterAmount -= 0.005;
    }
    
    //prevColour = ctx.strokeStyle;
    //console.log(prevColour);
    newAlphaForRGBA();

    layer.batchDraw();
}

image.on('mousedown', () => {
    isPainting = true;
    lastPointerPos = stage.getPointerPosition();
    /* add draw listener on mousedown */
    stage.on('mousemove', draw);
});

/* this is different from the example : the example stage took up the whole page */
/* so we could listen for mouseup there. as our stage is only a part of the page */
/* we have to instead listen on the document itself */
document.addEventListener("mouseup", () => {
    isPainting = false;
    /* remove draw listener on mouseup */
    stage.off('mousemove', draw);
});


/////////////////////////////////////////////////////// Drawing Canvas
let Trig = {
    distBtwn2Points: (p1, p2) => {
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        return Math.sqrt(Math.pow(dx,2) + Math.pow(dy, 2));
    },
    angleBtwn2Points: (p1, p2) => {
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        return Math.atan2(dx, dy);
    }
}

function colourize(img, r, g, b){
  const offScreen = new OffscreenCanvas(brushImage.width, brushImage.height);
  const osCTX = offScreen.getContext("2d");
  
  osCTX.drawImage(img, 0, 0);

  const imgData = osCTX.getImageData(0, 0, brushImage.width, brushImage.height);

  for (let i = 0; i < imgData.data.length; i += 4){
    imgData.data[i + 0] *= r;
    imgData.data[i + 1] *= g;
    imgData.data[i + 2] *= b;
  }

  osCTX.putImageData(imgData, 0, 0);

  return offScreen;
}