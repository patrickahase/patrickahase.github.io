let findWindowSize = {};

findWindowSize.reportWidth = window.innerWidth + "px wide";

findWindowSize.reportHeight = window.innerHeight + "px high";

findWindowSize.currentHeight = function() {
  return window.innerHeight + "px high";
}

/* the function above is the same as the one below, but stored in the findWindowSize namespace */
/* 
function currentHeight(){
  return window.innerHeight + "px high";
}
 */