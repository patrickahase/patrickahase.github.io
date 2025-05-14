/* find modal close button and add an eventlistener */
document.getElementById("dialogCloseBtn").addEventListener("click", () => {
  document.getElementById("introDialog").close();
  toneInit();
});

/* to get the backdrop working we need to trigger modal open with js */
//document.getElementById("introDialog").showModal();

document.getElementById("openDialog").addEventListener("click", openDreamDialog);

function openDreamDialog(){
  document.getElementById("introDialog").showModal();
}

function toneInit(){
  mySynth.connect(myReverb);
  myReverb.toDestination();
}

let mySynth = new Tone.MembraneSynth();

let myReverb = new Tone.Reverb(10);

let synthButton = document.getElementById("synthTriggerBtn");

synthButton.addEventListener("click", () => {
  mySynth.triggerAttackRelease("D2", "2n");
  setTimeout(() => {
    myReverb.set({
      wet: 0
    })
  }, 1000);
});

let button1 = document.getElementById("b1");


// width: button1.offsetWdith,
// height: button1.offsetHeight
console.log(button1.offsetWidth);

button1.addEventListener("click", () => {
  console.log(button1.offsetWidth);
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









