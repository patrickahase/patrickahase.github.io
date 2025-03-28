let waterAmount = 0.5;
let currentColour = "rgba(255, 255, 255, 0)";

document.getElementById("waterCupMouth").addEventListener("click", () => {
    waterAmount = 1;
});

document.getElementById("palette01").addEventListener("click", () => {
    currentColour = `rgba(160, 101, 205, ${waterAmount})`;
});
document.getElementById("palette02").addEventListener("click", () => {
    currentColour = `rgba(206, 121, 210, ${waterAmount})`;
});
document.getElementById("palette03").addEventListener("click", () => {
    currentColour = `rgba(214, 143, 184, ${waterAmount})`;
});
document.getElementById("palette04").addEventListener("click", () => {
    currentColour = `rgba(221, 162, 163, ${waterAmount})`;
});



function setBrushColour(newColour){
    ctx.strokeStyle = newColour;
}

function newAlphaForRGBA(){    
    let newColour = currentColour.slice(0, currentColour.length-2) + waterAmount + ")";
    setBrushColour(newColour);
}




