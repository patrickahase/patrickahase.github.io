// init variables
let lastKnownScrollPosition = 0;
let gainNodeArray = [];
let playerArray = [];
let currentXFade = 0;
// set up web audio api context placeholder
let audioCtx;

// choice of mix tracks
let trackArray = [
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3"
];

// add event listener for mix load button
document.getElementById("mix-load-button").addEventListener("click", () => {
  audioInit();
  // expand height to 1 screen per song
  document.body.style.height = `${100*trackArray.length}%`;
  document.body.style.backgroundSize = `100% ${100*trackArray.length}%`;
  document.getElementById("loading-wrapper").style.display = "none";
  document.getElementById("text-wrapper").style.display = "flex";
});

function audioInit(){
  audioCtx = new AudioContext();
  // create audio elements and attach gain node
  trackArray.forEach(track => {
    // create audio element
    let trackAudioNode = document.createElement('audio');
    // set its source from the trackArray value
    trackAudioNode.src = track;
    trackAudioNode.crossOrigin = "anonymous";
    // add the audio player to the DOM
    document.body.append(trackAudioNode);
    // create gain node to control volume volume and set to 0
    let gainNode = new GainNode(audioCtx);
    gainNode.gain.value = 0;
    // store reference to gain node
    gainNodeArray.push(gainNode);
    // connect player to gain to audio main mix
    let trackSource = audioCtx.createMediaElementSource(trackAudioNode);
    trackSource.connect(gainNode).connect(audioCtx.destination);
    // set tracks to loop
    trackAudioNode.loop = true;
    trackAudioNode.play();
    // add to player reference array
    playerArray.push(trackAudioNode);
  });
  // first track's gain up to 1
  gainNodeArray[0].gain.value = 1;

  document.addEventListener('scroll', function() {
    handleScroll();
  }, { passive: true });
}

function handleScroll(){  
  // return normalised 0-1 of page scroll
  let normalScroll = getScrollPercent() * (trackArray.length-1);
  // calculate the int to select the right x-fade
  let floorScroll = Math.floor(normalScroll);
  // calculate the decimal to adjust the crossfade
  let decScroll = normalScroll % 1;
  // handle start and stop and fix fades if overshoot
  // scrolling down
  if(floorScroll > currentXFade && floorScroll !== trackArray.length-1){
    currentXFade = floorScroll;
    gainNodeArray[currentXFade-1].gain.value = 0;
  }
  // scrolling up
  if(floorScroll < currentXFade){
    currentXFade = floorScroll;
    gainNodeArray[currentXFade+1].gain.value = 0;
  }
  // set crossfade
  crossFade(decScroll, gainNodeArray[currentXFade], gainNodeArray[currentXFade+1]) 
}

function getScrollPercent() {
  var h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  // 0.999999 is to scale it smaller than 100 for final track cut
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight)*0.999999;
}

// "Web Audio API: Advanced Sound for Games and Interactive Apps" by Boris Smus
// https://webaudioapi.com/
// crossfade function based on the one found in the above book

let crossFade = (percent, gainNode1, gainNode2) => {
  // Use an equal-power crossfading curve:
  var gain1 = Math.cos(percent * 0.5*Math.PI);
  var gain2 = Math.cos((1.0 - percent) * 0.5*Math.PI);
  gainNode1.gain.value = gain1;
  gainNode2.gain.value = gain2;
}