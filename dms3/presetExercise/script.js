///////// Presets

let presetOne = {
  spreadAmount: 5,
  tempoFilterFrequencyAmount: 50,
  delayChanceAmount: 0.2,
  volumeDistAmount: 100
}

let presetTwo = {
  spreadAmount: 15,
  tempoFilterFrequencyAmount: 20,
  delayChanceAmount: 0.5,
  volumeDistAmount: 110
}

let presetThree = {
  spreadAmount: 0,
  tempoFilterFrequencyAmount: 80,
  delayChanceAmount: 0.1,
  volumeDistAmount: 90
}

let presetButtonOne = document.getElementById("presetOne");
let presetButtonTwo = document.getElementById("presetTwo");
let presetButtonThree = document.getElementById("presetThree");

let startTime;
let transitionTime = 2000;
let currentPreset = presetOne;
let presetChangeCalc = {};

function step(timestamp) {
  if (startTime === undefined) {
    startTime = timestamp;
  }
  const elapsed = timestamp - startTime;

  applyPresetOverTime(elapsed/transitionTime);

  if (elapsed < transitionTime) {
    requestAnimationFrame(step);
  }
}
//requestAnimationFrame(step, presetOne);

/* let start;

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  // Math.min() is used here to make sure the element stops at exactly 200px
  const shift = Math.min(0.1 * elapsed, 200);
  var2Input.value = shift;
  if (shift < 200) {
    requestAnimationFrame(step);
  }
}

requestAnimationFrame(step); */


function applyPresetOverTime(timestamp){
  console.log(timestamp)
  var1Input.value = newPreset.spreadAmount - (prevPreset.spreadAmount * (1 - timestamp));
}

function applyPreset(newPreset){
  var1Input.value = newPreset.spreadAmount;
  var2Input.value = newPreset.tempoFilterFrequencyAmount;
  var3Input.value = newPreset.delayChanceAmount;
  var4Input.value = newPreset.volumeDistAmount;
}

function calculatePresetChange(newPreset){
  presetChangeCalc = currentPreset;
  presetChangeCalc.spreadChange = currentPreset.spreadAmount - newPreset.spreadAmount;
  presetChangeCalc.tempoFilterFrequencyChange = currentPreset.tempoFilterFrequencyAmount - newPreset.tempoFilterFrequencyAmount;
  presetChangeCalc.delayChanceChange = currentPreset.delayChanceAmount - newPreset.delayChanceAmount;
  presetChangeCalc.volumeDistChange = currentPreset.volumeDistAmount - newPreset.volumeDistAmount;
  currentPreset = newPreset;
}

presetButtonTwo.addEventListener("click", () => {
  let newPreset = presetTwo;
  if(newPreset.spreadAmount !== currentPreset.spreadAmount){
    console.log("change")
  }
  //calculatePresetChange(presetTwo);
});

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
