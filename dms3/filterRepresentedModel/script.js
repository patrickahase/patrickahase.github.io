/* find the filter range inputs and add eventlistener */
document.getElementById("filterControlOne").addEventListener("input", e => {
  /* find element's new value */
  let newValue = e.target.value;
  /* set filters dilation : this function is defined in customFilterAPI.js */
  setFirstDilation(newValue);
});

/* find the filter range inputs and add eventlistener */
document.getElementById("filterControlTwo").addEventListener("input", e => {
  /* find element's new value */
  let newValue = e.target.value;
  /* set filters noise seed : this function is defined in customFilterAPI.js */
  setSecondNoiseSeed(newValue);
});

/* find the filter range inputs and add eventlistener */
document.getElementById("filterControlThree").addEventListener("input", e => {
  /* find element's new value */
  let newValue = e.target.value;
  /* set filters displation amount : this function is defined in customFilterAPI.js */
  setSecondDisp(newValue);
});