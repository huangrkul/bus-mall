'use strict';

//CONFIGURABLES/////////////
var prodDisplayNumbers = 3; //how many images need to be generated on screen.
var totalTries = 5;
/////////////////////////////

//variables for html anchors
var imgList = document.getElementById('imgsList');
var resultBox = document.getElementById('resultBox');
//hidden at start.
resultBox.style.display = 'none';
var results = document.getElementById('results');
var footer = document.getElementById('footer');
var totalRnds = document.getElementById('tries');
var preloadImgs = document.getElementById('preload');

//global variables that will be used later.
var liEl = null;
var imgEl = null;
var priorProducts = [];
var prodImgArray = [];
var delayTimer = null;

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
  ['sweep','.jpg'],
  ['tauntaun','.jpg'],
  ['unicorn','.jpg'],
  ['usb','.gif'],
  ['water-can','.jpg'],
  ['wine-glass','.jpg']
];

var currentTries = 0;

//chart var
var barChart = document.getElementById('barChart').getContext('2d');
var theChart;
var chartLabels = [];
var chartViews = [];
var chartViewColors = [];
var chartViewBorders = [];
var chartVotes = [];
var chartVoteColors = [];
var chartVoteBorders = [];

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
  //depending on total displayed products, the li tag will have different class that caters to the overall design.
  for(var j=0; j < prodDisplayNumbers; j++){
    liEl = document.createElement('li');
    if(prodDisplayNumbers < 5){
      liEl.classList.add('products-few');
    } else {
      liEl.classList.add('products-lots');
    }
    imgEl = document.createElement('img');
    imgEl.addEventListener('click', imgClickHandler);
    liEl.appendChild(imgEl);
    imgList.appendChild(liEl);
    prodImgArray.push(imgEl);
  }
  /*the do while loop does the following in order:
  1. If the priorProducts Array is empty, generate the first random number. Also push the number into priorProduct array.
  2. If not, generate a random number and evaluate it with existing numbers in the randArray AND priorProducts Array
  3. arrayToCheck is either priorProducts or randArray depending on if this is the first time rendering.
  4. Two conditions for evaluation:
      - If more than half of total products are displayed, don't check against prior products.
      - If not, check against both priorProducts and randArray.
  5. During the evaluation, if the number matches existing number in arrays, isRepeated = true.
  6. If not, isRepeated remains false.
  7. If the evaluation returns a false, which means the number is unique, therefore, can be pushed into the array.
  8. Repeat step 1 to 7 while the length of the randArray is less than prodDisplayNumbers.
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
        if(prodDisplayNumbers < Products.allProds.length / 2) {
          if(randIndex === randArray[i] || randIndex === priorProducts[i]) {
            isRepeated = true;
          }
        } else {
          if(randIndex === randArray[i]) {
            isRepeated = true;
          }
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

  //priorProduct clones randArray values
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
    //total tries get refreshed
    totalRnds.textContent = totalTries - currentTries;
    imgList.innerHTML = '';
    renderProds();
  } else {
    //if hits total tries
    alert('Thank you for your feedback!  Here is the result:');
    //remove all eventlisteners from current images, change cursor style back to auto
    for (var k=0; k < prodImgArray.length; k++){
      prodImgArray[k].removeEventListener('click',imgClickHandler);
      prodImgArray[k].style.cursor = 'auto';
    }
    resultBox.style.display = 'flex';
    footer.scrollIntoView();
    //set a delay for opacity animation in displayResult();
    delayTimer = setTimeout(displayResult, 100);
  }
}

//populate result total with actual data
function displayResult() {
  clearTimeout(delayTimer);
  resultBox.classList.remove('hide-results');
  resultBox.classList.add('show-results');
  var resultLi = document.getElementsByClassName('resultList');
  for (var i=0; i < Products.allProds.length; i++) {
    var product = Products.allProds[i];
    resultLi[i].textContent += ` ${product.views} views / ${product.clicked} votes`;
  }
  //set a delay so the graph can animate in rather than displayed already.
  delayTimer = setTimeout(generateChart, 500);
}

//populate chart with actual data and update the chart.
function generateChart() {
  clearTimeout(delayTimer);
  chartViews = [];
  chartVotes = [];

  for(var i=0; i < Products.allProds.length; i++) {
    var products = Products.allProds[i];
    chartViews.push(products.views);
    chartVotes.push(products.clicked);
  }
  theChart.data.datasets[0].data = chartViews;
  theChart.data.datasets[1].data = chartVotes;
  console.log(theChart.data.datasets[0].data);
  theChart.update();
}

//constructor function instantiate
//create empty result list with product names
//create empty chart with product names
function init() {

  //instantiate objects
  for(var i=0; i < objArray.length; i++){
    new Products(objArray[i][0], objArray[i][1]);
  }

  //preload images to prevent image swap flickers due to img load.
  for(var a=0; a < Products.allProds.length; a++){
    var productImg = Products.allProds[a].image;
    var preImg = document.createElement('img');
    preImg.src = productImg;
    preloadImgs.appendChild(preImg);
  }

  //display current total tries
  totalRnds.textContent = totalTries;

  //create empty result list
  for (var k=0; k < Products.allProds.length; k++) {
    var empResultLi = document.createElement('li');
    var product = Products.allProds[k];
    empResultLi.classList.add('resultList');
    empResultLi.textContent = `${product.name}:`;
    results.appendChild(empResultLi);
  }

  //fetch Products.allProds.name and push them into chartLabel
  //set initial bar data value, bar color, and bar border color
  for(var j=0; j < Products.allProds.length; j++) {
    var productLabels = Products.allProds[j];
    chartLabels.push(productLabels.name);
    chartViews.push(0);
    chartViewColors.push('rgba(206,86,56,0.5)');
    chartViewBorders.push('rgba(206,86,56,0.8)');
    chartVotes.push(0);
    chartVoteColors.push('rgba(227,171,48,0.5)');
    chartVoteBorders.push('rgba(227,171,48,0.8)');
  }

  //create empty bar chart with labels and initial values from the above loop.
  //Chart instantiates from chart.js constructor fucntion.
  theChart = new Chart(barChart, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: '# of Views',
          data: chartViews,
          backgroundColor: chartViewColors,
          borderColor: chartViewBorders,
          borderWidth: 1
        },
        {
          label: '# of Votes',
          data: chartVotes,
          backgroundColor: chartVoteColors,
          borderColor: chartVoteBorders,
          borderWidth: 1
        }
      ],
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  //start rendering first set of products.
  renderProds();
}

init();


