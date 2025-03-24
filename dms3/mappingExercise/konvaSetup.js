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

/* find context and set drawing variables */
/* for more details about context options : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D */
const ctx = canvas.getContext('2d');
ctx.strokeStyle = "red";
ctx.lineJoin = "round";
ctx.lineWidth = 5;

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

    /* need to cache as we go to apply filters */
    image.cache();

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

/////////////////////////////////////////////////////// Filters
let noiseOn = true;
let blurOn = true;
let pixelateOn = true;

let activeFilterList = [];

function updateActiveFilterList(){
    activeFilterList = [];
    if(noiseOn) activeFilterList.push(Konva.Filters.Noise);
    if(blurOn) activeFilterList.push(Konva.Filters.Blur);
    if(pixelateOn) activeFilterList.push(Konva.Filters.Pixelate);
    image.filters(activeFilterList);
}

updateActiveFilterList();

image.filters(activeFilterList);
image.noise(0);
image.blurRadius(0);
image.pixelSize(1);
