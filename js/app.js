'use strict';

//the images should not show up repeatedly (from prior 3)

//variables for html anchors
// var imgBox = document.getElementById('imgsContainer');
var imgList = document.getElementById('imgsList');

//create li and img elements to handle dynamic amount of displayed products.
var liEl = null;
var imgEl = null;

//actual images in an Array
var objArray = [
  ['bag','.jpg'],
  ['banana','.jpg'],
  ['bathroom','.jpg'],
  ['boots','.jpg'],
  ['breakfast','.jpg'],
  ['bubblegum','.jpg'],
  ['chair','.jpg'],
  ['cthulhu','.jpg'],
  ['dog-duck','.jpg'],
  ['dragon','.jpg'],
  ['pen','.jpg'],
  ['pet-sweep','.jpg'],
  ['scissors','.jpg'],
  ['shark','.jpg'],
  ['sweep','.png'],
  ['tauntaun','.jpg'],
  ['unicorn','.jpg'],
  ['usb','.gif'],
  ['water-can','.jpg'],
  ['wine-glass','.jpg']
];

var prodDisplayNumbers = 3; //how many images need to be generated;
var prodImgArray = []; //this holds all the img tags created dynamically.

//uppercase first letter in constructor name!!!!
function Products (name, ext) {
  this.name = name;
  this.image = 'img/' + name + ext;
  //push all instants into an array.  (instead of giving name to each object)
  Products.allProds.push(this);
}

//an array of all the instantianted objects in constructor property.
Products.allProds = [];

//this returns a random number between 0 and allProds length.
function randomProd() {
  var randNum = Math.floor(Math.random() * Products.allProds.length);
  return randNum;
}
//function to render the randomly picked products to img tags.
function renderProds() {
  //this holds the 3 unique random numbers
  var randArray = [];
  var randIndex = null;

  /*the do while loop does the following in order:
    1. If the randArray is empty, generate the first random number.
    2. If not, generate a random number and evaluate it with existing numbers in the randArray.
    3. During the evaluation, if the number matches existing number in array, isRepeated = true.
    4. If not, isRepeated remains false.
    5. If the evaluation returns a false, which means the number is unique, therefore, can be pushed into the array.
    6. Repeat step 1 to 5 while the length of the randArray is less than prodDisplayNumbers.
    */
  do {
    if(randArray.length === 0) {
      randIndex = randomProd();
      randArray.push(randIndex);
    } else {
      randIndex = randomProd();
      var isRepeated = false;
      for(var i=0; i < randArray.length; i++) {
        if(randIndex === randArray[i]) {
          isRepeated = true;
        }
      }
      if(!isRepeated) {
        randArray.push(randIndex);
      }
    }
  } while (randArray.length < prodDisplayNumbers);

  for (var k=0; k < randArray; k++) {
    var products = Products.allProds;
    prodImgArray[k].src = products[randArray[k]].image;
    console.log(products[randArray[k]]);
  }
}


function init() {
  for(var i=0; i < objArray.length; i++){
    new Products(objArray[i][0], objArray[i][1]);
  }
  for(var j=0; j < prodDisplayNumbers; j++){
    liEl = document.createElement('li');
    imgEl = document.createElement('img');
    liEl.appendChild(imgEl);
    imgList.appendChild(liEl);
    prodImgArray.push(imgEl);
  }
  renderProds();
}

init();


