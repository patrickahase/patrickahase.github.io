let layerColourMap = [
    document.getElementById("firstLayerFld"),
    document.getElementById("secondLayerFld")
];

/* this function changes either layers colour - it takes two arguments */
/* layerNumber which selects the appropriate element from the above array (remember arrays start at 0) */
/* newColour sets a new colour variable - it checks to see if its valid otherwise it will default to black */
/* so for example calling it like this: */
/* setLayerColour(1, 'blue'); */
/* would set the second layer's colour to blue */
/* but calling this: */
/* setLayerColour(1, 'bleu') */
/* would default the second layer's colour to black as 'bleu' isn't a valid named colour keyword */
/* it will accept a range of values, such as rgb, hsv, rgba etc as long as they're passed as a string (that is inside quotes like below) */
/* setLayerColour(1, 'rgb(255 0 153)'); */
/* for information on what colour values are accepted see the below link: */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/color_value */

function setLayerColour(layerNumber, newColour){

    let validColour = 'black';

    if(CSS.supports('color', newColour)){
        validColour = newColour;
    }

    layerColourMap[layerNumber].setAttribute("flood-color", validColour);
}

let layerAlphaMap = [
    document.getElementById("firstLayerColMtx"),
    document.getElementById("secondLayerColMtx")
];

/* this function changes either layers alpha - it takes two arguments */
/* layerNumber which selects the appropriate element from the above array (remember arrays start at 0) */
/* newAlpha sets a new alpha variable - this is clamped so its between 0 and 1 */
/* so for example calling it like this: */
/* setLayerAlpha(0, 0.2); */
/* would set the first layer's alpha to 0.2 */

function setLayerAlpha(layerNumber, newAlpha){

    let clampedAlpha = clamp(newAlpha, 0, 1);

    let newValues = ` 1.000  0.000  0.000  0.000  0.000 
                      0.000  1.000  0.000  0.000  0.000 
                      0.000  0.000  1.000  0.000  0.000 
                      0.000  0.000  0.000  ${clampedAlpha}  0.000`;
    layerAlphaMap[layerNumber].setAttribute("values", newValues);
}

let firstLayerDilation = document.getElementById("firstLayerMorph");

/* this function changes the first layer's dilation */
/* it only takes one argument : newDilation which sets the radius of the dilation */
/* so for example calling it like this: */
/* setFirstDilation(4); */
/* would increase it's size (it's set to 2 by default) */

function setFirstDilation(newDilation){
    firstlayerDilation.setAttribute("radius", newDilation);
}

let firstLayerBlur = document.getElementById("firstLayerBlur");

/* this works as above, but changes the first layer's blur amount */
/* it's set to 1 by default */

function setFirstBlur(newBlurAmount){
    firstlayerBlur.setAttribute("stdDeviation", newBlurAmount);
}

let firstLayerNoise = document.getElementById("secondLayerNoise");

/* this works as above, but changes the second layer's noise seed */
/* this is the control for the randomness of the noise */
/* it's set to 4 by default */

function setSecondNoiseSeed(newSeed){
    firstLayerNoise.setAttribute("seed", newSeed);
}

/* this works as above, but changes the second layer's noise octaves */
/* this is the control for the complexity of the noise */
/* it's set to 3 by default */

function setSecondNoiseOctaves(newOctaves){
    firstLayerNoise.setAttribute("numOctaves", newOctaves);
}

/* this works as above, but changes the second layer's noise frequency */
/* this is the control for zooming the noise */
/* it's set to 0.05 by default */

function setSecondNoiseFreq(newFreq){
    firstLayerNoise.setAttribute("baseFrequency", newFreq);
}

let firstLayerDisplace = document.getElementById("secondLayerDisp");

/* this works as above, but changes the second layer's displacement amount */
/* it's set to 10 by default */

function setSecondDisp(newDispAmount){
    firstLayerDisplace.setAttribute("scale", newDispAmount);
}

/* this is a helper function */
/* it makes sure that the input is between the min-max range */

function clamp(input, min, max){
    return Math.min(Math.max(input, min), max);
}

