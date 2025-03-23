/* find modal close button and add an eventlistener */
document.getElementById("dialogCloseBtn").addEventListener("click", () => {
  document.getElementById("introDialog").close();
  toneInit();
});

/* to get the backdrop working we need to trigger modal open with js */
document.getElementById("introDialog").showModal();

/* we set up the map before anything else - this way our variables can be part of the init */

///////// Define Input Variables
/* min 1 max 25 step 1 */
let var1 = 5;
let var1Input = document.getElementById("var1Range");
var1Input.value = var1;

let oscCount = 3;
// ideal range : int 1 - 5 step 1 init 3?
let oscSpread = 10;
// ideal range : int 1 - 100 step 1 init 30

let var2 = 50;
let var2Input = document.getElementById("var2Range");
var2Input.value = var2;

let var3 = 100;
let var3Input = document.getElementById("var3Range");
var3Input.value = var3;

///////// Synthesizer

let polySynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "fatsawtooth",
    count: oscCount,
    spread: oscSpread,
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
  wet: oscSpread / 200
});

let filter = new Tone.Filter(0, "highpass");

const dist = new Tone.Distortion(0);

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

  polySynth.chain(filter, autoPanner, dist, Tone.Destination);

  //Tone.Transport.start();

  //polySynth.set({detune: 2000});

  //console.log(polySynth.get({detune: {}}));

}

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
    console.log(filter.get({frequency : {}}))
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

document.getElementById("playbackToggle").addEventListener("click", () => {
  Tone.Transport.start();
});

document.getElementById("test").addEventListener("input", e => {
  let value = e.target.value;
  let newVolume = remapRange(clamp(value, 0, 100), 0, 100, -48, 0);
  polySynth.set({volume: newVolume});
  let distLevel = remapRange(clamp(value, 100, 130), 100, 130, 0, 1);
  dist.set({ distortion : distLevel });
});

/* marks for vol/dist */

/////////////// Representation of tone mental model ///////////////


/* 
Source          -------------->    Destination

Synthesizer     .toDesination()    Audio Driver ( => Audio Hardware )
Audio Player
*/


/* 
Trigger             ---------------------->   Source          

Pitch, Length       .triggerAttackRelease()   Synthesizer
Pitch, Start Time   .triggerAttack()      
End Time            .triggerRelease()

Start Playback      .start()                  Audio Player
Stop Playback       .stop()
*/


/* 
Source          --------->    Effect        -------------->    Destination

Synthesizer     .connect()    Reverb        .toDesination()    Audio Driver ( => Audio Hardware )
Audio Player                  Phaser        OR
                              Distortion    .connect()         Other Effect
                              etc
*/

