let testPara = null;


  // p tags to print lists to
  let listP1 = document.getElementById("lp-1");
  let listP2 = document.getElementById("lp-2");

  // button to do something
  let pButton = document.getElementById("pop-button");

  let nameArray = [
    "principe",
    "hyperdub",
    "allergy season",
    "diasart",
    "spectrum spools",
    "orange milk",
    "powertrip",
    "presto!?",
    "pan",
    "naafi"
  ];

  let usedNameArray = [];

  let currentSide = "left";

  // example for range
  window.addEventListener("mousemove", checkMousePosition);

  function checkMousePosition(e){
    //console.log(e);
    //console.log(e.clientX);
    if(e.clientX > window.innerWidth/2){
      if(currentSide === "left"){
        console.log("right");
        currentSide = "right";
      }
    } else {
      if(currentSide === "right"){
        console.log("left");
        currentSide = "left";
      }
      
    }
    //console.log(remapRange(e.clientX, 0, window.innerWidth, 0, 100));
    //console.log(document.body.offsetHeight);
  }

  // when clicked do something with the arrays
  pButton.addEventListener("click", displayArray);

  /* pButton.addEventListener("click", function(){
    randomPosition(draggableDiv);
  }); */

  function displayArray(){
    shuffleArray(nameArray);
    //listP1.innerHTML = nameArray;
    //listP1.innerHTML = nameArray.shift();
    let newName = nameArray.shift();
    listP1.innerHTML = newName;
    usedNameArray.push(newName);
    console.log(usedNameArray);
    if(nameArray.length > 0){
      let newName = nameArray.shift();
      listP1.innerHTML = newName;
      usedNameArray.push(newName);
    } else {
      nameArray = usedNameArray;
      usedNameArray = [];
      let newName = nameArray.shift();
      listP1.innerHTML = newName;
      usedNameArray.push(newName);
    }
    
    //listP1.innerHTML = nameArray[getRandomIntRange(0,9)];
    //listP2.innerHTML = nameArray;
    //listP2.innerHTML = usedNameArray;
  }

// helper functions

// generic range remap
function remapRange(input, low1, high1, low2, high2){
  return low2 + (high2 - low2) * (input - low1) / (high1 - low1);
}

// random int
function getRandomIntRange(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// random float
function getRandomFloatRange(min, max){
  return Math.random() * (max - min) + min;
}

// shuffle array order
function shuffleArray(array){
  array.sort(() => Math.random() - 0.5);
}

// move given element to random position
function randomPosition(el){
  el.style.position = 'absolute';
  el.style.left = getRandomFloatRange(0, window.innerWidth - el.offsetWidth) + "px";
  el.style.top = getRandomFloatRange(0, window.innerHeight - el.offsetHeight) + "px";
}