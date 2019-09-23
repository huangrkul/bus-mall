'use strict';

//the images should not show up repeatedly (from prior 3)

var nullVar = null; //start null then add value later

//uppercase first letter in constructor name!!!!
function SomeCons (name, image) {
  this.name = name;
  this.image = image;
  //push all instants into an array.  (instead of giving name to each object)
  SomeCons.allImgs.push(this);
}

//this returns a random number between 0 and allImgs length.
function randomImg() {
  var randNum = Math.floor(Math.random() * SomeCons.allImgs.length);
  return randNum;
}

//create do while loop in image rendering logic: do it once, if same numbers, do it again.
function renderImg() {
  do{
    //generate random numbers
  }while(//check if numbers are same);
}

//a property in constructor function that holds an array of all the instants.
SomeCons.allImgs = [];
