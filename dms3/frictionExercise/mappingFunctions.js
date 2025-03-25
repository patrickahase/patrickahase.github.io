/* below are mapping functions */
/* this is a roundabout way to do things : i would usually just set these directly */
/* however for this exercise it'll make it way quicker for you */

/* sets the brush size on the canvas (works for eraser too) */
/* has pretty large range : it doesn't want to be 0 but can go to 0.01 */
/* can be as large as you want */
function setBrushSize(value){
    ctx.lineWidth = value;
}

/* sets the brush colour : will accept any valid css color value */
/* remember this includes those with alpha */
/* also accepts gradients and patterns : this is outside the scope of this exercise */
/* but if its something you want to build on the information is below */
/* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle */


/* below are helper functions */
/* these are tools to do small bits of math calculations for use in your other functions */

/* takes a number value and limits it to the min-max range */
function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}
// clamp(-12 , 0, 10) will return 0
// clamp(12 , 0, 10) will return 10
// clamp(7 , 0, 10) will return 7


/* takes a number value within a given range and maps it to another range */
function remapRange(value, min1, max1, min2, max2){
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}
// eg: I want to convert the cursor'x x position into a hue value
// if my window is 768px wide, my cursor's possible range is 0 - 768
// a hue value has a range of 0 - 360
// i could run remapRange(mouseXPos, 0, 768, 0, 360) which would remap the ranges
// eg if my mouse is halfway across the screen, where mouseXPos would equal 384, the 
// above function would return 180 as it's halfway through the second range


/* takes a single number value and returns a hsl colour value */
/* saturation and lightness are set to a default but this can be changed */
function hslFromHue(hue){
    let saturation = 100;
    let lightness = 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
// hslFromHue(249) will return hsl(249, 100%, 50%)
