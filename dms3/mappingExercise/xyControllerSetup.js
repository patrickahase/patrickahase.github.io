/* this is slightly more complex than it needs to be for a single xy controller */
/* i've written it based on classes rather than ids so that adding multiple controllers will also work */

/* find all xy controllers by finding all of their parent boxes via class */
/* getElementsByClassName returns a HTML collection by default so I'm wrapping it in */
/* an Array.from() to turn it into an array which makes it easier to work with */
let xyControllers = Array.from(document.getElementsByClassName("xyControlBox"));

/* now we iterate through each xyController found in the above array and set up their functionality */
xyControllers.forEach(xyBox => {
    /* find references to internal elements */
    let xyPosMarker = xyBox.querySelector(".xyPosMarker");
    let svgCTM = xyBox.querySelector(".xySVGEl").getScreenCTM();
    /* if window is resized work out new SVG transform */
    window.addEventListener("resize", () => {
        svgCTM = xyBox.querySelector(".xySVGEl").getScreenCTM();
    });
    /* init marker pos */
    let markerXPos, markerYPos = 3;
    /* track if currently in drag mode */
    let dragging = false;

    /* we only want to track mouse pos when dragging */
    function startXYDrag(){
        document.body.classList.add("drag-active");
        /* these are added to the document rather than xy element */
        /* this way if cursor goes outside bounds it'll still track */
        document.addEventListener("mousemove", xyDragging);
        document.addEventListener("mouseup", endXYDrag);
    }

    /* this is the main function */
    function xyDragging(e){
        /* this if() and requestAnimationFrame are a frame throttle */
        /* tracking mouse position happens very fast, more than once per frame */
        /* this basically ties the calculations to the current frame rate */
        if(!dragging){
            window.requestAnimationFrame(() => {
                /* this is the main part of the dragging */
                /* it finds the mouse global position : e.clientX */
                /* and then minuses the amount of space from the left : svgCTM.e */
                /* then divides by the coordinate ratio of the SVG : svgCTM.a */
                /* this part is the most complex - basically the bits in the brackets are measured in px */
                /* but the svg is measured in an interval of 100 so to get it in a range of 0 - 100 we have to divide by the width ratio */
                /* finally its all sent to our clamp function to keep it between 0 - 100 */
                markerXPos = clamp((e.clientX - svgCTM.e)/svgCTM.a, 0, 100);
                markerYPos = clamp((e.clientY - svgCTM.f)/svgCTM.d, 0, 100);
                /* these update the marker circle to match the mouse position */
                xyPosMarker.setAttribute("cx", markerXPos);
                xyPosMarker.setAttribute("cy", markerYPos);
                /* and finally we update x & y values */
                newXValue(markerXPos);
                newYValue(markerYPos);
                dragging = false;
            });
            dragging = true;
        }
    }

    /* remove additional event listeners when we're done */
    function endXYDrag(){
        document.body.classList.remove("drag-active");
        document.removeEventListener("mousemove", xyDragging);
        document.removeEventListener("mouseup", endXYDrag);
    }

    xyBox.addEventListener("mousedown", startXYDrag);
    xyBox.addEventListener("mousedown", xyDragging);
});


