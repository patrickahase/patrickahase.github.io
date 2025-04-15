///////// Presets

/* presetOne, presetTwo, presetThree are all objects containing the values of each preset */
/* for this to work each will need members with the exact same names */
/* here i've given them names descriptive of their application, but they are just range inputs 1,2,3 & 4 */
let presetOne = {
  spreadAmount: 5,
  tempoFilterFrequencyAmount: 50,
  delayChanceAmount: 0.2,
  volumeDistAmount: 100
}
/* then we find each radio input : i've named them buttons but note they're <input type="radio" /> elements */
let presetButtonOne = document.getElementById("presetOne");
/* we add the click event listener which sends the appropriate object to our apply preset function */
presetButtonOne.addEventListener("click", () => {
  applyPreset(presetOne);
});

let presetTwo = {
  spreadAmount: 15,
  tempoFilterFrequencyAmount: 20,
  delayChanceAmount: 0.5,
  volumeDistAmount: 110
}
let presetButtonTwo = document.getElementById("presetTwo");
presetButtonTwo.addEventListener("click", () => {
  applyPreset(presetTwo);
});

let presetThree = {
  spreadAmount: 0,
  tempoFilterFrequencyAmount: 80,
  delayChanceAmount: 0.1,
  volumeDistAmount: 90
}
let presetButtonThree = document.getElementById("presetThree");
presetButtonThree.addEventListener("click", () => {
  applyPreset(presetThree);
});

/* this expects one of the three objects as an input */
/* it won't work if the input object doesn't have the same members */
function applyPreset(newPreset){
  /* here we're setting the value of the range slider element directly */
  /* we can find the appropriate value in our newPreset by using dot notation */
  /* that is the name of the object followed by a . then by the name of the memeber we want to find */
  var1Input.value = newPreset.spreadAmount;
  /* finally because the range elements are wired up to update the synth parameters based on */
  /* when the user inputs a change via the browser : see line 149 in toneSetup.js for an example */
  /* they won't update if the value is instead changed via JavaScript like we're doing here */
  /* to get around this we simulate an input event using the dispatchEvent() method like seen below */
  var1Input.dispatchEvent(new Event("input"));
  var2Input.value = newPreset.tempoFilterFrequencyAmount;
  var2Input.dispatchEvent(new Event("input"));
  var3Input.value = newPreset.delayChanceAmount;
  var3Input.dispatchEvent(new Event("input"));
  var4Input.value = newPreset.volumeDistAmount;
  var4Input.dispatchEvent(new Event("input"));
}

/* finally to make sure the default preset is loaded on page load */
/* check the first option */
presetButtonOne.checked = true;
/* run the apply preset function */
applyPreset(presetOne);

///////// Feedback

let meterText = document.getElementById("meterOutputText");
let meterCheckInterval = 100;
let currentVolume = null;

setInterval(() => {
  /* meter defined in toneSetup */
  currentVolume = meter.getValue();
  let newRemappedValue = remapRange(parseInt(clamp(currentVolume, -48, 0)), -48, -6, 0, 100);
  if(newRemappedValue < 1){
    meterText.innerHTML = "🔇";
  } else if(newRemappedValue < 60) {
    meterText.innerHTML = "🔉";
  } else {
    meterText.innerHTML = "🔊";
  }
}, meterCheckInterval);
