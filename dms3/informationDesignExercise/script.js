/* 
Information Design exercise :
Visually design each of the four range sliders without using words (emojis are ok).
You may work with CSS or sketch your design in another program.
Your designs should use ambiguity : some indication, however abstract, of what you think the sliders do.
Be mindful of the represented model of the slider : Do you want to use tick marks? How does your design match the range?
*/

/* marks for vol/dist */

/////////////// Model of Instrument ///////////////

/* 
Trigger           -------------------------->   Source      ------->    Effects Chain                               ----------------->    Destination            
Start Playback    part.triggerAttackRelease()   PolySynth   .chain()    filter -> autoPanner -> dist -> pingPong    Tone.Destination()    Audio Driver ( => Audio Hardware )

Keyboard          triggerAttack()
                  triggerRelease()
*/

/* 
Range Slider 1:
Oscillator Count
Oscillator Spread
Humanize (random note offset)
Auto Panner
*/

/* 
Range Slider 2:
High Pass and Low Pass Filters (opposite ends of range)
BPM (speed of part playback)
Detune (PolySynth pitch)
*/

/* 
Range Slider 3:
Probability (random chance note in part won't play)
PingPong Delay Volume
PingPong Delay Feedback
*/

/* 
Range Slider 4:
PolySynth Volume
Distortion Amount
*/

///////// Modal

/* find modal close button and add an eventlistener */
document.getElementById("dialogCloseBtn").addEventListener("click", () => {
  document.getElementById("introDialog").close();
  toneInit();
});

/* to get the backdrop working we need to trigger modal open with js */
document.getElementById("introDialog").showModal();

/* we set up the map before anything else - this way our variables can be part of the init */

///////// Define Input Variables

let var1 = 5;
let var1Input = document.getElementById("var1Range");
var1Input.value = var1;

let var2 = 50;
let var2Input = document.getElementById("var2Range");
var2Input.value = var2;

let var3 = 0.2;
let var3Input = document.getElementById("var3Range");
var3Input.value = var3;

let var4 = 100;
let var4Input = document.getElementById("var4Range");
var4Input.value = var4;

///////// Synthesizer

let polySynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 10,
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
    attackCurve: "exponential",
  }
});

///////// Effects

let autoPanner = new Tone.AutoPanner("8n").start();
autoPanner.set({
  wet: 30 / 200
});

let filter = new Tone.Filter(0, "highpass");

const dist = new Tone.Distortion(0);

const pingPong = new Tone.PingPongDelay("8n", 0.2);
pingPong.set({
  wet: 0.2
});

///////// Note Sequence

let sequence = [
  {note: "D3", velocity: 0.9, time: 0},
  {note: "F3", velocity: 0.9, time: 0},
  {note: "A4", velocity: 0.9, time: 0},
  {note: "E4", velocity: 0.9, time: 0},

  {note: "E3", velocity: 0.9, time: "2n"},
  {note: "G#3", velocity: 0.9, time: "2n"},
  {note: "B4", velocity: 0.9, time: "2n"},
  {note: "D4", velocity: 0.9, time: "2n"},
];

let part = new Tone.Part(((time, value) => {
  polySynth.triggerAttackRelease(value.note, "2n", time, value.velocity);
}), sequence).start(0);

part.loop = true;
part.humanize = true;
part.probability = 0.8;

///////// Init Connections

function toneInit(){
  polySynth.chain(filter, autoPanner, dist, pingPong, Tone.Destination);
}

let isPlaying = false;
let playbackToggleButton = document.getElementById("playbackToggle");

playbackToggleButton.addEventListener("click", () => {
  if(!isPlaying){
    Tone.Transport.start();
    isPlaying = true;
    playbackToggleButton.innerHTML = "⏸️";
  } else {
    Tone.Transport.pause();
    //Tone.Transport.stop();
    isPlaying = false;
    playbackToggleButton.innerHTML = "▶️";
  }
});

var1Input.addEventListener("input", e => {
  let intValue = Math.floor(e.target.value);
  let newCount = clamp(1 + (intValue / 5), 3, 6);
  let newSpread = intValue * 2;
  let newHumanize = newSpread / 200;
  polySynth.set({oscillator : {
    count: newCount,
    spread: newSpread
  }});
  autoPanner.set({
    wet: newSpread / 100
  });
  part.humanize = newHumanize;
});

var2Input.addEventListener("input", e => {
  let value = e.target.value;
  if(value > 50){
    filter.set({
      frequency: clamp(remapRange(value, 60, 100, 0, 6000), 0, 6000),
      type: "highpass"
    });
  } else {
    filter.set({      
      frequency: clamp(remapRange(value, 0, 40, 0, 20000), 0, 20000),
      type: "lowpass"
    });
  }
  Tone.Transport.bpm.value = 60 + Math.floor(value);
  polySynth.set({detune: remapRange(value, 0, 100, -1200, 1200)});
});

var3Input.addEventListener("input", e => {
  let value = e.target.value;
  part.probability = 1 - value;
  pingPong.set({
    wet: value,
    feedback: value
  });
});

var4Input.addEventListener("input", e => {
  let value = e.target.value;
  let newVolume = remapRange(clamp(value, 0, 100), 0, 100, -48, 0);
  polySynth.set({volume: newVolume});
  let distLevel = remapRange(clamp(value, 100, 130), 100, 130, 0, 1);
  dist.set({ distortion : distLevel });
});

///////// Helper Functions

function remapRange(value, min1, max1, min2, max2){
  return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}


