var player,playerImag;
var obstacleGroup,obstacle1,obstacle2,obstacle3;
var gameState = "play";
var Score = 0;



function preload(){
    obstacle1 = loadImage("images/obs1.png");
    obstacle2 = loadImage("images/obs2.png");
    obstacle3 = loadImage("images/obs3.png");
    bg = loadAnimation("images/city.jpg");
    playerImag = loadAnimation("images/playeredit.gif");
}


function setup(){
 createCanvas(windowWidth,windowHeight);

 ground = createSprite(70,height-50,200,30)
 ground.visible = false;

 background1 = createSprite(windowWidth/2,windowHeight/2-200);
 background1.addAnimation("background",bg);
 background1.scale = 4.5;
 background1.velocityX = -3;



 player = createSprite(100,height-200,10,10);
 player.addAnimation("player",playerImag);
 player.scale=0.7
 //player.debug = true;
 player.setCollider("rectangle",0,0,100,player.height);

 obstaclesGroup = new Group()

}


function draw(){
 background(0);
if(gameState === "play"){

Score = Score+Math.round(frameCount/100)


if(background1.x < 200 ){
        background1.x = width/2
}

if(keyDown("space")){
    player.velocityY = -15;
    
}
 player.velocityY+=0.5
 player.collide(ground);
 spawnObstacle();
 if(obstaclesGroup.isTouching(player)){
         gameState ="END"
 }
 
 drawSprites();

 textSize(20)
fill("black")
textStyle(BOLD)
text("Score: "+Score,width-300,100)

text("Pres space to JUMP and beware of cars",100,20)
}
if (gameState === "END"){
        textSize(50);
        stroke("green");
        strokeWeight(4)
        fill("white");
        text("Game Over",width/2-100,height/2);

        textSize(30);
        stroke("white");
        strokeWeight(3)
        fill("white");
        text("Press R to restart",width/2-100,height/2+75);


}
}

function spawnObstacle(){
    if (frameCount % 200 === 0){
        var obstacle = createSprite(width,height-150);
        obstacle.velocityX = -6;
       // obstacle.debug = true;
        
        
         // //generate random obstacles
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: obstacle.addImage(obstacle1);
                   break;
           case 2: obstacle.addImage(obstacle2);
           obstacle.setCollider("rectangle",0,50,350,100)
                   break;
           case 3: obstacle.addImage(obstacle3);
           obstacle.scale = 1.8;
           obstacle.setCollider("rectangle",0,0,200,100)
                   break;
          
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         //obstacle.scale = 0.5;
         obstacle.lifetime = width/-6;
        
        //adding obstacles to the group
        obstaclesGroup.add(obstacle);
      }
     }

