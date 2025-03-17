/* basic synth for note input */

const synth = new Tone.Synth().toDestination();

/* transport set up : will add bpm later */

let transportToggle = document.getElementById("transport-toggle");

let isPlaying = false;

transportToggle.addEventListener("click", () => {
  if(isPlaying){
    transportToggle.innerHTML = "⏵";
    Tone.Transport.pause();
  } else {
    transportToggle.innerHTML = "⏸";
    Tone.Transport.start();
  }
  isPlaying = !isPlaying;
});

/* callback loop */

const loop = new Tone.Loop((time) => {
  // triggered every eighth note.
  nextStep(time);
}, "8n").start(0);

/* array with current active steps */

let currentSequence = [];

let currentStep = 0;

/* find inputs and add eventlistener and map to sequence array */

let stepBoxes = Array.from(document.getElementsByClassName("seqStepBox"));

let stepInputs = Array.from(document.getElementsByClassName("seqStep"));

stepInputs.forEach((stepInput, index) => {

  currentSequence.push({
    stepIndex : index,
    note: "C4",
    active: stepInput.checked,
    inputElement: stepInput,
    boxElement: stepBoxes[index],
    reset: index === stepInputs.length-1 ? true : stepInputs[index+1].indeterminate
  });

  stepInput.addEventListener("click", () => {
    if(stepInput.readOnly) {
      stepInput.checked = stepInput.readOnly = false;
      currentSequence[index].active = false;
    } else if(!stepInput.checked) {
      stepInput.readOnly = stepInput.indeterminate = true;
      currentSequence[index].active = false;
      if (index !== 0) {
        currentSequence[index-1].reset = true;
      }
      currentSequence[index].active = false;
    } else {
      currentSequence[index].active = true;
    }
  });
});

function nextStep(time){
  /* play note */
  if(currentSequence[currentStep].active){
    synth.triggerAttackRelease(currentSequence[currentStep].note, "8n", time);
  }

  /* style */
  if (currentStep === 0){
    currentSequence[0].boxElement.classList.add("activeStep");
    /* store this as a precomputed var */
    currentSequence[currentSequence.length-1].boxElement.classList.remove("activeStep");
  } else {
    currentSequence[currentStep].boxElement.classList.add("activeStep");
    currentSequence[currentStep-1].boxElement.classList.remove("activeStep");
  } 
  if (currentSequence[currentStep].reset) {
    currentStep = 0;
  } else {
    currentStep ++;
  }
}