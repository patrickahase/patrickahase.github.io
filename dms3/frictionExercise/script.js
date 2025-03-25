let waterAmount = 0.5;
let currentColour = "rgba(255, 255, 255, 0)";

document.getElementById("waterCupMouth").addEventListener("click", () => {
    waterAmount = 1;
});

document.getElementById("palette01").addEventListener("click", () => {
    currentColour = `rgba(90, 0, 132, ${waterAmount})`;
});
document.getElementById("palette02").addEventListener("click", () => {
    currentColour = `rgba(230, 57, 0, ${waterAmount})`;
});



function setBrushColour(newColour){
    ctx.strokeStyle = newColour;
    console.log(ctx.strokeStyle);
}

function newAlphaForRGBA(){
    //currentColour = ctx.strokeStyle;
    console.log(waterAmount);
    
    let newColour = currentColour.slice(0, currentColour.length-2) + waterAmount + ")";
    setBrushColour(newColour);
}




