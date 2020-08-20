var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY = 1
var END = 0;

var gamestate = PLAY;


var gameOver,restart,gameOverImage,restartImage;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(trex.x + 100,300,10000000,20);
  ground.addImage("ground",groundImage);
  
  
  invisibleGround = createSprite(200,310,10000000,10);
  invisibleGround.visible = false;
  
gameOver = createSprite(300,100);
restart = createSprite(300,140);
gameOver.addImage("gameOver",gameOverImage);
gameOver.scale = 0.5;
restart.addImage("restart",restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  camera.position.x = trex.x;
  camera.position.y = displayHeight/2;
  console.log(score);
  textSize(30);
  text("REACH 500 TO WIN",trex.x - 200, 500);  
  
  text("Score: "+ score, 500,200);
  
  if(gamestate == PLAY){
    trex.velocityX = 4;
    trex.velocityY = trex.velocityY + 0.4 ;
    score.velocityX = 4;
    if(keyDown("space") && trex.y >= 159) {
    trex.velocityY = -10;
    }
    if (ground.x < 0){
    ground.x = ground.width/1;
    }
    score = score + Math.round(getFrameRate()/60);
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gamestate = END;    
    }
     
     }
   else if(gamestate == END){
     
    gameOver.visible = true;
    restart.visible = true;
     
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    
    trex.changeAnimation("collided",trex_collided)
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  
  
  
     }
     if(score > 500){
       textSize(20);
       text("YOU WIN",trex.x,200)

     }
  if(mousePressedOver(restart)){
    reset();
     
     
     }
     if(ground.x < trex.x){
       ground.x = trex.x + 500;
     }
  
  
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(trex.x,200,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(trex.x + 200,300,10,40);
    obstacle.velocityX = -10;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gamestate = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}