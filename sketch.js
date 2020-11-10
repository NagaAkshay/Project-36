//Create variables here
var dog, happyDog;
var dogImg, happyDogImg;
var dataBase;
var foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var changingGameState, readingGameState;
var bedRoomImg, deadDogImg, dogVacImg, gardenImg, lazyImg, hallImg, runningRightImg, runningLeftImg, vacImg, restRoomImg;
var gameState = "Hungry";


function preload(){
  //load images here
  dog_img = loadImage("Dog.png");
  happyDog_img = loadImage("images/dogImg1.png");
  bedRoomImg = loadImage("images/virtual pet images/Bed Room.png")
  deadDogImg = loadImage("images/virtual pet images/deadDog.png")
  dogVacImg = loadImage("images/virtual pet images/dogVaccination.png")
  gardenImg = loadImage("images/virtual pet images/Garden.png")
  lazyImg = loadImage("images/virtual pet images/Lazy.png")
  hallImg= loadImage("images/virtual pet images/Living Room.png")
  runningRightImg = loadImage("images/virtual pet images/running.png")
  runningLeftImg = loadImage("images/virtual pet images/runningLeft.png")
  vacImg = loadImage("images/virtual pet images/Vaccination.jpg")
  restRoomImg = loadImage("images/virtual pet images/Wash Room.png")
  sadDogImg = loadImage("images/virtual pet images/deadDog.png")
}

function setup() {
  //Create the desired canvas
  createCanvas(displayWidth - 20, displayHeight - 20);

  // Create the background
  background(46, 139, 87);
  
  // Create the spites here
  dog = createSprite(800, 200);
  dog.addImage("dog_Img", dog_img);
  dog.addImage("happyDog_Img", happyDog_img);
  dog.scale = 0.25;

  dataBase = firebase.database();

  foodStock = dataBase.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

  changingGameState = dataBase.ref('gameState');
  

  readingGameState = dataBase.ref('gameState');
  readingGameState.on("value", (data)=>{
    gameState=data.val();
  })
}


function draw() {  
  // Add the background
  background(46, 139, 87);

  foodObj.display();

  //add styles here
  textSize(30);
  fill("blue");
  stroke(2, "black");
  text("Food Remaining: "+foodS, 680, 50);

  fedTime = dataBase.ref('fedTime');
  fedTime.on("value", (data)=>{lastFed = data.val();
  });

  fill(255, 255, 254);
        textSize(15);
        if (lastFed >= 12) {
            text("Last Fed: " + lastFed%12 + "PM", 350, 30);
        }else if(lastFed === 0){
            text("Last Fed : 12 Am", 350, 30);
        }else{
            text("Last Fed : " + lastFed + "Am", 350, 30);
        }

  if (gameState !== "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDogImg);
  }

  currentTime = hour();
  if (currentTime === (lastFed + 1)) {
    update("Playing")
    foodObj.garden();
  }else if(currentTime === (lastFed + 2)){
    update("Sleeping")
    foodObj.bedRoom();
  }else if(currentTime > (lastFed + 2) && currentTime <= (lastFed+4)){
    update("Bathing")
    foodObj.washRoom();
  }else if(currentTime >= (lastFed+4)){
    update("Vaccination")
    foodObj.vaccine();
  }
  


  // Draw the Sprites
  drawSprites();
}

 

//Function to readStock from the dataBase
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

//Function to writeStock from the dataBase
function writeStock(x) {

  if (x <= 0) {
    x=0;
  }else{
    x = x-1
  }
  dataBase.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++;
  dataBase.ref('/').update({
    Food:foodS
  })
}

function feedDog() {
  dog.changeImage("happyDog_Img");

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  dataBase.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
  
}

function update(state) {
  dataBase.ref('/').update({
    gameState:state
  })
}



