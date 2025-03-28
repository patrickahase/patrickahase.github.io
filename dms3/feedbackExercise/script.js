/* remember the different js files work together, and the import order matters */

/* 
Feedback Exercise:
Create an alternative form of feedback for the volume, making use of the currentVolume variable.
Ideas you could try:

- control the background colour of the playbackToggle Button element (or any other element)
- you'll need to work out how to set backgroundColor via JS
- color-mix will let you work with a mix of colours based on % https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
- remember it will expect a string

- you could change between 4 different emojis based on volume thresholds : 🔇🔈🔉🔊
- you would need to create a text element to hold them and work out how to swap via JS
- you might want to check the currentVolume using some if else statements

- you could create a volume bar whose width changes with volume
- you would need to give it a size and backgroundColor
- then update its width as a % using js based on currentVolume
- remember it will expect a string

- create any other form of feedback you want
*/

///////// Feedback

let meterText = document.getElementById("meterOutputText");

let meterCheckInterval = 100;

let currentVolume = null;

setInterval(() => {
  /* meter defined in toneSetup */
  currentVolume = meter.getValue();
  meterText.innerHTML = currentVolume;
}, meterCheckInterval);
