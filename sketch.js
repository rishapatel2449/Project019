var PLAY = 1;
var END = 0;
var gameState = PLAY;
//var gameState = END
var path, leftBoundary,rightBoundary,topBoundary,bottomBoundary
var carImg
var obstacle,obstacleImg 
var restart,gameOver, gameOverImg;
var score=0
var obstaclesGroup
var cyclist,cyclistGroup,cyclistImage


function preload(){
    pathImg = loadImage("path.png");
    carImg = loadImage("cars4.png");
    obstacleImg = loadImage("car1.png");
    gameOverImg = loadImage("gameover.png")
   cyclistImage = loadAnimation("opponent1.png")
}

function setup() {
    createCanvas(400,400);

    path=createSprite(200,200);
    path.addImage(pathImg);
    path.velocityY = 4;
    path.scale=1.2;

    car = createSprite(180,340,30,30);
    car.scale=0.2;
    car.addAnimation("running",carImg);
    //car.setCollider=("rectangle",0,0,300,570);
    gameOver = createSprite(200,150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false

    leftBoundary=createSprite(0,0,100,800);
    leftBoundary.visible = false;

    rightBoundary=createSprite(410,0,100,800);
    rightBoundary.visible = false;

    rightBoundary=createSprite(0,410,100,800);
    rightBoundary.visible = false;

    rightBoundary=createSprite(410,0,100,800);
    rightBoundary.visible = false;
    
    obstaclesGroup=createGroup()
    cyclistGroup=createGroup();

    //score=0;
}

function draw() {

   background(0);
   drawSprites();
   textSize(20);
 fill(120);
 text("Score: "+ score, 300,50);
   

   path.velocityY = 4

   // car.debug=false

    car.x = World.mouseX;
    car.y = World.mouseY

    edges= createEdgeSprites();
  car.collide(edges[3]);
  car.collide(leftBoundary);
  car.collide(rightBoundary);
  //car.collide(topBoundary);
  //car.collide(bottomBoundary);

  if(path.y > 400 ){path.y = height/2;}
    
    if (gameState===PLAY){

        spawnObstacles();
        Cyclist();

        path.velocityY=4
        score=score+Math.round(frameCount/60)
    
        
    if (obstaclesGroup.isTouching(car)){
       gameState=END
        car.velocityY=0
        /*car.addImage(gameOverImg);
        car.scale=0.2;
        car.x=300;
       car.y=300;*/

    }
  }

  if (cyclistGroup.isTouching(car)){
    gameState=END
     car.velocityY=0
     /*car.addImage(gameOverImg);
     car.scale=0.2;
     car.x=300;
    car.y=300;*/

 }


   else if (gameState===END){
    gameOver.visible = true
    
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart!", 100,200);
    /*car.addImage(gameOverImg);
        car.scale=0.2;
        car.x=300;
       car.y=300;*/


    path.velocityY=0
    obstaclesGroup.velocityY=0
    obstaclesGroup.destroyEach()

    cyclistGroup.velocityY=0
    cyclistGroup.destroyEach()
   

    if(keyDown("UP_ARROW")) {
        reset();
      }
        
      }
      
    
    
}

function reset(){
    gameState=PLAY
    car.addAnimation("running",carImg);
      obstaclesGroup.destroyEach()
     gameOver.visible=false
      score=0
      
      spawnObstacles();

      car.scale=0.2
    car.x = World.mouseX;
    car.y= World.mouseY
    edges= createEdgeSprites();
    car.collide(edges);

     textSize(25);
    text("Score : "+ score,250,50);
}


function spawnObstacles() {
    if (frameCount %200  === 0) {
       obstacle= createSprite(10,-50);
       obstacle.addImage(obstacleImg)
       obstacle.x = Math.round(random(120,370));
       obstacle.scale=0.05
       obstacle.velocityY = 1;
        obstacle.lifetime=800;

        car.depth=obstacle.depth
        obstacle.depth+=1
 
        obstaclesGroup.add(obstacle)
       
     }
  } 

  function Cyclist(){
    if(World.frameCount%320===0){
      cyclist=createSprite(400,250,20,20);
      cyclist.scale=0.05;
      cyclist.addAnimation("moving", cyclistImage);
      cyclist.x = 0   ;
      cyclist.velocityX=3;
      cyclist.setLifetime=50;

      car.depth=cyclist.depth
        cyclist.depth+=1
      
      cyclistGroup.add(cyclist);
    }
  }
        


