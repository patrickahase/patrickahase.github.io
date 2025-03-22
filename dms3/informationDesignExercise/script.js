/* find modal close button and add an eventlistener */
document.getElementById("dialogCloseBtn").addEventListener("click", () => {
  document.getElementById("introDialog").close();
  toneInit();
});

/* to get the backdrop working we need to trigger modal open with js */
document.getElementById("introDialog").showModal();

/* we set up the map before anything else - this way our variables can be part of the init */

///////// Map Inputs
/* I would not normally name these variables like this : just for the exercise */

/* this input has a range of 1 - 10 with a 0.1 step : init with value of 1 */
let variable1RangeInput = document.getElementById("var1Range");
let variable1 = variable1RangeInput.value;

let oscCount = 3 + (variable1 / 4);
let oscSpread = 30 + variable1;

document.getElementById("synthRange").addEventListener("input", e => {
  polySynth.set({oscillator: {spread: 30 * e.target.value }});
});

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

  polySynth.toDestination();

  
}






document.getElementById("playbackToggle").addEventListener("click", () => {
  Tone.Transport.start();
});



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