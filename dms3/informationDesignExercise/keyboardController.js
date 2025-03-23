/* this is where you'd change out what the keyboard is controlling */
/* as its imported AFTER script.js where polySynth is defined I can assign it here */

let keyboardSynth = polySynth;

/* get all the keys */

let allKeys = Array.from(document.getElementsByClassName("whiteKey")).concat(Array.from(document.getElementsByClassName("blackKey")));

let mouseDown = false;
let lastNote;

window.addEventListener("mousedown", () => {mouseDown = true});
window.addEventListener("mouseup", () => {mouseDown = false});

allKeys.forEach(key => {
    key.addEventListener("mousedown", e => {
        //e.target.classList.add("activeKey");
        let note = e.target.dataset.note;
        let octave = e.target.parentElement.parentElement.dataset.octave;
        keyboardSynth.triggerAttack(note+octave);
    });
    key.addEventListener("mouseup", e => {
        //e.target.classList.remove("activeKey");
        let note = e.target.dataset.note;
        let octave = e.target.parentElement.parentElement.dataset.octave;
        keyboardSynth.triggerRelease(note+octave);
    });
    key.addEventListener("mouseenter", e => {
        if(mouseDown === false){ return }
        //e.target.classList.add("activeKey");
        let note = e.target.dataset.note;
        let octave = e.target.parentElement.parentElement.dataset.octave;
        keyboardSynth.triggerAttack(note+octave);
    });
    key.addEventListener("mouseleave", e => {
        //e.target.classList.remove("activeKey");
        let note = e.target.dataset.note;
        let octave = e.target.parentElement.parentElement.dataset.octave;
        keyboardSynth.triggerRelease(note+octave);
    });
});