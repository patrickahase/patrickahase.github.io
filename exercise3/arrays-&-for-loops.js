var fruit1 = "banana";
var fruit2 = "pineapple";
var fruit3 = "apple";
var fruit4 = "peach";
var fruit5 = "orange";

var fruitArray = ["banana", "pineapple", "apple", "peach", "orange"];

fruitArray[1] = "carrot";

for(var fruit of fruitArray){
    if(fruit === "carrot"){
        console.log("this isn't a fruit")
    } else {
        console.log(fruit)
    }
}


