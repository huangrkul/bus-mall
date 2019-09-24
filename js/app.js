'use strict';

//CONFIGURABLES/////////////
var prodDisplayNumbers = 3; //how many images need to be generated on screen.
var totalTries = 5;
/////////////////////////////

//variables for html anchors
var imgList = document.getElementById('imgsList');
var results = document.getElementById('results');

//global variables that will be used later.
var liEl = null;
var imgEl = null;
var priorProducts = [];
var prodImgArray = [];

//object arguments: name and ext
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

var currentTries = 0;

//uppercase first letter in constructor name!!!!
function Products (name, ext) {
  this.name = name;
  this.image = 'img/' + name + ext;
  this.views = 0;
  this.clicked = 0;
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
  var arrayToCheck = null;
  prodImgArray = [];

  //copy randArray values into priorProducts Array.

  //generate the li and img for the amount of prodDisplayNumbers
  for(var j=0; j < prodDisplayNumbers; j++){
    liEl = document.createElement('li');
    imgEl = document.createElement('img');
    imgEl.addEventListener('click', imgClickHandler);
    liEl.appendChild(imgEl);
    imgList.appendChild(liEl);
    prodImgArray.push(imgEl);
  }
  /*the do while loop does the following in order:
  1. If the priorProducts Array is empty, generate the first random number.
  2. If not, generate a random number and evaluate it with existing numbers in the randArray AND priorProducts Array
  2.5 arrayToCheck against is either priorProducts or randArray depending on if this is the first time rendering.
  3. During the evaluation, if the number matches existing number in arrays, isRepeated = true.
  4. If not, isRepeated remains false.
  5. If the evaluation returns a false, which means the number is unique, therefore, can be pushed into the array.
  6. Repeat step 1 to 5 while the length of the randArray is less than prodDisplayNumbers.
  */
  do {
    if(priorProducts.length === 0) {
      randIndex = randomProd();
      randArray.push(randIndex);
      priorProducts.push(randIndex);
    } else {
      randIndex = randomProd();
      var isRepeated = false;
      if(priorProducts.length === 1) {
        arrayToCheck = randArray;
      } else {
        arrayToCheck = priorProducts;
      }
      for(var i=0; i < arrayToCheck.length; i++) {
        if(randIndex === randArray[i] || randIndex === priorProducts[i]) {
          isRepeated = true;
        }
      }
      if(!isRepeated) {
        randArray.push(randIndex);
      }
    }
  } while (randArray.length < prodDisplayNumbers);

  //finally, attach each associated object.image to img.src
  for (var k=0; k < randArray.length; k++) {
    var products = Products.allProds;
    prodImgArray[k].id = products[randArray[k]].name;
    prodImgArray[k].src = products[randArray[k]].image;
    products[randArray[k]].views++;
    console.log(products[randArray[k]]);
  }

  priorProducts = randArray.slice(0);
  console.log(priorProducts);
}

//this handles the click event
function imgClickHandler(event) {
  console.log(event.target);
  //keeps track of all the items clicked
  for (var i=0; i < Products.allProds.length; i++){
    if(event.target.id === Products.allProds[i].name) {
      Products.allProds[i].clicked++;
      console.log(Products.allProds[i].clicked);
    }
  }
  //increment tries
  currentTries++;

  //if not at total, then remove all li and render() again
  if (currentTries <= totalTries){
    imgList.innerHTML = '';
    renderProds();
  } else {
    //if hits total tries
    alert('That is it');
    //remove all eventlisteners from current images, change cursor style back to auto
    for (var i=0; i < prodImgArray.length; i++){
      prodImgArray[i].removeEventListener('click',imgClickHandler);
      prodImgArray[i].style.cursor = 'auto';
    }
    displayResult();
  }
}

//generate all results as one list
function displayResult() {
  for (var i=0; i < Products.allProds.length; i++) {
    var resultLi = document.createElement('li');
    var product = Products.allProds[i];
    resultLi.textContent = `${product.name} has a total of ${product.views} views / ${product.clicked} clicks`;
    results.appendChild(resultLi);
  }
}


function init() {
  for(var i=0; i < objArray.length; i++){
    new Products(objArray[i][0], objArray[i][1]);
  }
  renderProds();
}

init();


