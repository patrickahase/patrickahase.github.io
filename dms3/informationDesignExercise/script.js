/* find modal close button and add an eventlistener */
document.getElementById("dialogCloseBtn").addEventListener("click", () => {
  document.getElementById("introDialog").close();
  toneInit();
});

/* to get the backdrop working we need to trigger modal open with js */
document.getElementById("introDialog").showModal();

function toneInit(){
  /* grainPlayer.toDestination();
  grainPlayer.start(); */
  grainPlayer = new Tone.GrainPlayer({
    url: buffer,
    loop: true,
    grainSize: 0.01,
    overlap: 0.04,
    playbackRate: 0.01,
    reverse: false
  }).toDestination();
}


/////////////// Setting up the GrainPlayer

/* set up audio buffer : easy access storage for audio file */

const buffer = new Tone.ToneAudioBuffer("./media/guessSo.mp3");

let grainPlayer;

document.getElementById("playbackToggle").addEventListener("click", () => {
  grainPlayer.start(Tone.now());
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