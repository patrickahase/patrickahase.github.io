// instantiate 2 gradient strings for text and bg
let bodyGradient = `linear-gradient(to top, `;
let textbgGradient = `linear-gradient(to top, `;
// loop to create gradients the size of the track list
for(let i=0; i < trackArray.length; i++){
  let genColourNumber = Math.floor(Math.random()*360);    
  // handle if last colour so needs to close the array
  if(i === trackArray.length-1){
    bodyGradient = bodyGradient + `hsl(${genColourNumber} 50% 80%))`;
    textbgGradient = textbgGradient + `hsl(${genColourNumber+180} 50% 80%))`;
  } else {
    bodyGradient = bodyGradient + `hsl(${genColourNumber} 50% 80%), `;
    textbgGradient = textbgGradient + `hsl(${genColourNumber+180} 50% 80%), `;
  }
}
// set the two background gradients
document.body.style.background = bodyGradient;
document.getElementById("scroll-wrapper").style.background = textbgGradient;