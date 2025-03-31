///////// Feedback

let meterText = document.getElementById("meterOutputText");

let meterCheckInterval = 100;

let currentVolume = null;

setInterval(() => {
  /* meter defined in toneSetup */
  currentVolume = meter.getValue();
  meterText.innerHTML = currentVolume;
}, meterCheckInterval);
