const synth = new Tone.Synth().toDestination();

const seq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
  // subdivisions are given as subarrays
}, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]).start(0);

seq.probability = 0.8;

function playNote() {
  Tone.Transport.stop();
  Tone.Transport.start();
}