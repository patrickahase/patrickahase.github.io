/* #region Global Setting */
const sliders = [
  document.getElementById('var1Range'),
  document.getElementById('var2Range'),
  document.getElementById('var3Range'),
  document.getElementById('var4Range'),
  document.getElementById('var5Range'),
  document.getElementById('var6Range'),
  document.getElementById('var7Range'),
  document.getElementById('var8Range'),
  document.getElementById('var9Range'),
  document.getElementById('var10Range')
];

let stage, layer, imageNode;
const ranges = {};
let currentImageData;

// Konva stage and layer setup //
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('container');
  stage = new Konva.Stage({ container, width: container.clientWidth, height: container.clientHeight });
  layer = new Konva.Layer();
  stage.add(layer);

  // Slider event listeners //
  sliders.forEach(slider => {
    ranges[slider.id] = slider;
    slider.addEventListener('input', debounce(applyGlitchEffect, 50));
  });

  // File Upload event listener //
  document.getElementById('input-file').addEventListener('change', handleFileUpload);

  // Size Adjustment on canvas //
  window.addEventListener('resize', () => {
    stage.size({ width: container.clientWidth, height: container.clientHeight });
    if (imageNode) fitImageToStage();
  });

  // Default image load //
  loadImage('medusa.jpeg');
});

// Fit image to stage, maintain aspect ratio //
function fitImageToStage() {
  const cw = stage.width(), ch = stage.height();
  const iw = imageNode.width(), ih = imageNode.height();
  const ratio = iw / ih, boxRatio = cw / ch;
  const newW = ratio > boxRatio ? cw : ch * ratio;
  const newH = ratio > boxRatio ? cw / ratio : ch;
  imageNode.size({ width: newW, height: newH });
  imageNode.position({ x: (cw - newW) / 2, y: (ch - newH) / 2 });
  layer.batchDraw();
}

// Load image and cache original data //
function loadImage(src) {
  const imageObj = new Image();
  imageObj.crossOrigin = "anonymous";
  imageObj.onload = () => {
    if (imageNode) imageNode.destroy();

    imageNode = new Konva.Image({ image: imageObj });
    layer.destroyChildren();
    layer.add(imageNode);
    fitImageToStage();

    // cache original pixels
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageNode.width();
    tempCanvas.height = imageNode.height();
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, tempCanvas.width, tempCanvas.height);
    currentImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

    applyGlitchEffect();
  };
  imageObj.src = src;
}
/* #endregion */

/* #region Import & Export Button */
// Import btn //
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const name = file.name.replace(/\.[^/.]+$/, "");
  originalFileName = `${name}-glitched.png`;
  const reader = new FileReader();
  reader.onload = e => {
    loadImage(e.target.result);
    resetSliders(); // reset sliders when new image is loaded //
  };
  reader.readAsDataURL(file);
}

// Export btn //
let originalFileName = 'glitched-image.png';

function exportImage() {
  const link = document.createElement('a');
  link.href = stage.toDataURL();
  link.download = originalFileName;
  link.click();
}
/* #endregion */

/* #region Reset & Random Button */
// Reset btn //
document.querySelector('label[for="reset"]').addEventListener('click', resetSliders);
function resetSliders() {
  sliders.forEach(slider => {
    slider.value = 0;
    slider.dispatchEvent(new Event('input'));
  });
  applyGlitchEffect();
}

// Random btn //
document.querySelector('label[for="random"]').addEventListener('click', randomizeSliders);
function randomizeSliders() {
  sliders.forEach(slider => {
    slider.value = Math.floor(Math.random() * 8);
    slider.dispatchEvent(new Event('input'));
  });
  applyGlitchEffect();
}
/* #endregion */

/* #region Apply Glitch Effect Progress */
function applyGlitchEffect() {
  if (!imageNode) return;

  // Provide effect on cached image data //
  imageNode.cache();
  const width = stage.width();
  const height = stage.height();
  const glitchCanvas = document.createElement('canvas');
  glitchCanvas.width = width;
  glitchCanvas.height = height;
  const ctx = glitchCanvas.getContext('2d');
  ctx.putImageData(currentImageData, 0, 0);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Apply effects based on slider values //
  if (parseInt(ranges.var1Range.value) > 0) applyRgbShift(data, width, height);
  if (parseInt(ranges.var2Range.value) > 0) applySaturation(data, width, height);
  if (parseInt(ranges.var3Range.value) > 0) applyNoise(data, width, height);
  if (parseInt(ranges.var4Range.value) > 0) applyScramble(data, width, height);
  if (parseInt(ranges.var5Range.value) > 0) applySorting(data, width, height);
  if (parseInt(ranges.var6Range.value) > 0) applyChromaticAberration(data, width, height);
  if (parseInt(ranges.var7Range.value) > 0) applyPixelation(data, width, height);
  if (parseInt(ranges.var8Range.value) > 0) applyBitDepthReduction(data, width, height);
  if (parseInt(ranges.var9Range.value) > 0) applyScanLine(data, width, height);
  if (parseInt(ranges.var10Range.value) > 0) applyBlur(data, width, height);
  
  ctx.putImageData(imageData, 0, 0);
  renderFinalImage(glitchCanvas);
}

// Debounce function to limit the rate of function calls //
function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(), wait);
  };
}
/* #endregion */

  /* #region RGB SHIFT */
  function applyRgbShift(data, width, height) {
    const strength = parseInt(ranges.var1Range.value);
    const effectStrength = strength / 10;
    if (effectStrength === 0) return;

    const maxOffset = 50; // 강도는 유지, 퍼포먼스 고려하여 적정치
    const shiftedData = new Uint8ClampedArray(data); // 원본 복사

    for (let y = 0; y < height; y++) {
      const rOffset = Math.floor((Math.random() - 0.2) * maxOffset * effectStrength);
      const gOffset = Math.floor((Math.random() - 0.2) * maxOffset * effectStrength);
      const bOffset = Math.floor((Math.random() - 0.2) * maxOffset * effectStrength);

      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const rX = Math.min(width - 1, Math.max(0, x + rOffset));
        const gX = Math.min(width - 1, Math.max(0, x + gOffset));
        const bX = Math.min(width - 1, Math.max(0, x + bOffset));

        const rIndex = (y * width + rX) * 4;
        const gIndex = (y * width + gX) * 4;
        const bIndex = (y * width + bX) * 4;

        data[index]     = shiftedData[rIndex];       // R
        data[index + 1] = shiftedData[gIndex + 1];   // G
        data[index + 2] = shiftedData[bIndex + 2];   // B
      }
    }
  }
  /* #endregion */

  /* #region SATURATION */
  function applySaturation(data, width, height) {
    const strength = parseInt(ranges.var2Range.value);
    const effectStrength = strength / 10;
    if (effectStrength === 0) return;

    const factor = effectStrength * 10;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const gray = 0.3 * r + 0.59 * g + 0.11 * b;

      data[i]     = Math.min(255, Math.max(0, gray + (r - gray) * factor));
      data[i + 1] = Math.min(255, Math.max(0, gray + (g - gray) * factor));
      data[i + 2] = Math.min(255, Math.max(0, gray + (b - gray) * factor));
    }
  }
  /* #endregion */

  /* #region NOISE */
function applyNoise(data, width, height) {
  const strength = parseInt(ranges.var3Range.value);
  const effectStrength = strength / 10;
  if (effectStrength === 0) return;

  const noiseAmount = effectStrength * 2000; // 최대 픽셀 수 조절

  for (let i = 0; i < noiseAmount * width; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const index = (y * width + x) * 4;

    const noise = (Math.random() - 0.5) * 255 * effectStrength;

    data[index]     = Math.max(0, Math.min(255, data[index] + noise));     // R
    data[index + 1] = Math.max(0, Math.min(255, data[index + 1] + noise)); // G
    data[index + 2] = Math.max(0, Math.min(255, data[index + 2] + noise)); // B
  }
}
/* #endregion */

  /* #region SCRAMBLE */
  function applyScramble(data, width, height) {
    const strength = parseInt(ranges.var4Range.value); // var4Range에 연결
    const effectStrength = strength / 10;
    if (effectStrength === 0) return;

    const blockSize = Math.floor(10 + effectStrength * 30); // 블럭 크기
    const numBlocks = Math.floor(effectStrength * 500);     // 섞을 블럭 수

    for (let i = 0; i < numBlocks; i++) {
      const x1 = Math.floor(Math.random() * (width - blockSize));
      const y1 = Math.floor(Math.random() * (height - blockSize));
      const x2 = Math.floor(Math.random() * (width - blockSize));
      const y2 = Math.floor(Math.random() * (height - blockSize));

      for (let y = 0; y < blockSize; y++) {
        for (let x = 0; x < blockSize; x++) {
          const idx1 = ((y1 + y) * width + (x1 + x)) * 4;
          const idx2 = ((y2 + y) * width + (x2 + x)) * 4;

          for (let c = 0; c < 4; c++) {
            const temp = data[idx1 + c];
            data[idx1 + c] = data[idx2 + c];
            data[idx2 + c] = temp;
          }
        }
      }
    }
  }
/* #endregion */

  /* #region SORTING */
function applySorting(data, width, height) {
  const strength = parseInt(ranges.var5Range.value);
  const effectStrength = strength / 10;
  if (effectStrength === 0) return;

  const numLines = Math.floor(height * effectStrength);
  const lineHeight = 10;

  for (let i = 0; i < numLines; i++) {
    const y = Math.floor(Math.random() * height);
    const line = [];

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      line.push([data[idx], data[idx + 1], data[idx + 2], data[idx + 3]]);
    }

    line.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      data[idx] = line[x][0];
      data[idx + 1] = line[x][1];
      data[idx + 2] = line[x][2];
      data[idx + 3] = line[x][3];
    }
  }
}
/* #endregion */

  /* #region CHROMATIC ABERRATION */
function applyChromaticAberration(data, width, height) {
  const strength = parseInt(ranges.var6Range.value);
  const effectStrength = strength / 10;
  if (effectStrength === 0) return;

  const offset = Math.floor(effectStrength * 30);
  const original = new Uint8ClampedArray(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      const rIdx = (y * width + Math.max(0, x - offset)) * 4;
      const gIdx = (y * width + x) * 4;
      const bIdx = (y * width + Math.min(width - 1, x + offset)) * 4;

      data[idx]     = original[rIdx];     // R
      data[idx + 1] = original[gIdx + 1]; // G
      data[idx + 2] = original[bIdx + 2]; // B
    }
  }
}
/* #endregion */

  /* #region PIXELATION */
function applyPixelation(data, width, height) {
  const strength = parseInt(ranges.var7Range.value);
  const effectStrength = strength / 10;
  if (effectStrength === 0) return;

  const pixelSize = Math.floor(2 + effectStrength * 20);

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      for (let dy = 0; dy < pixelSize; dy++) {
        for (let dx = 0; dx < pixelSize; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (nx >= width || ny >= height) continue;
          const nidx = (ny * width + nx) * 4;
          data[nidx] = r;
          data[nidx + 1] = g;
          data[nidx + 2] = b;
          data[nidx + 3] = a;
        }
      }
    }
  }
}
/* #endregion */

  /* #region BIT DEPTH REDUCTION */
  function applyBitDepthReduction(data, width, height) {
    const strength = parseInt(ranges.var8Range.value); // 0~10
    const effectStrength = strength / 10;
    if (effectStrength === 0) return;
  
    // 10단계 → 최대 10단계 유지, 단 '단계당 폭'은 커지게
    const baseLevels = 10;
    // 감각적으로 더 드라마틱하게 보이도록, nonlinear scaling
    const exaggeration = Math.pow(effectStrength, 2.5); // 비선형 곡선
  
    // 단계 수는 유지하되, step을 비정상적으로 크게
    const step = 355 / (baseLevels - exaggeration * 8); 
    const clampedStep = Math.max(1, Math.min(355, step));
  
    for (let i = 0; i < data.length; i += 4) {
      data[i]     = Math.round(data[i]     / clampedStep) * clampedStep;
      data[i + 1] = Math.round(data[i + 1] / clampedStep) * clampedStep;
      data[i + 2] = Math.round(data[i + 2] / clampedStep) * clampedStep;
    }
  }
  /* #endregion */

  /* #region SCAN LINE */
  function applyScanLine(data, width, height) {
    const strength = parseInt(ranges.var9Range.value);
    const lineGap = 2 + Math.floor(10 - strength); // 강도 높을수록 줄 간격 좁음
    const darkness = strength * 20;
  
    for (let y = 0; y < height; y++) {
      if (y % lineGap === 0) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          data[index]     = Math.max(0, data[index] - darkness);     // R
          data[index + 1] = Math.max(0, data[index + 1] - darkness); // G
          data[index + 2] = Math.max(0, data[index + 2] - darkness); // B
        }
      }
    }
  }
  /* #endregion */

  /* #region BLUR */
  function applyBlur(data, width, height) {
    const strength = parseInt(ranges.var10Range.value);
    const effectStrength = strength / 10;
    if (effectStrength === 0) return;
  
    const radius = Math.floor(1 + effectStrength * 6); // radius 최대 6까지 확장
    const kernelSize = radius * 2 + 1;
    const temp = new Uint8ClampedArray(data);
  
    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        let r = 0, g = 0, b = 0, count = 0;
  
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            const index = (ny * width + nx) * 4;
  
            r += temp[index];
            g += temp[index + 1];
            b += temp[index + 2];
            count++;
          }
        }
  
        const i = (y * width + x) * 4;
        data[i]     = r / count;
        data[i + 1] = g / count;
        data[i + 2] = b / count;
      }
    }
  }
  /* #endregion */

/* #endregion */

/* #region Final Render */
function renderFinalImage(glitchCanvas) {
  const newImg = new Image();
  newImg.onload = () => {
    const canvasWidth = imageNode.width(); 
    const canvasHeight = imageNode.height();
  
    imageNode.image(newImg);
    imageNode.width(canvasWidth);   // 이미지가 바뀌어도 사이즈 유지
    imageNode.height(canvasHeight);
  
    imageNode.x((stage.width() - canvasWidth) / 2);
    imageNode.y((stage.height() - canvasHeight) / 2);
    layer.batchDraw();
  };
  newImg.src = glitchCanvas.toDataURL();
}
/* #endregion */

/* #region Audio Toggle button */
const bgMusic = document.getElementById('bgmusic');
const muteToggle = document.getElementById('mute-toggle');

muteToggle.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted;
  muteToggle.src = bgMusic.muted ? 'mute.png' : 'play.png';
});
/* #endregion */