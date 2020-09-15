var fitToScreenX;
var fitToScreenY;
var planeTakeOff;
var newScale;
var PlaneDirection = "right";
	 // scale factor for box2d
var scale = 30;

imagePlane = new Image();
imagePlane.src = 'images/plane.png';

imageTerminal = new Image();
imageTerminal.src = "images/terminal.png";

imageObstacle1 = new Image();
imageObstacle1.src = "images/obstacle-1.png";

imageObstacle2 = new Image();
imageObstacle2.src = "images/obstacle-2.png";

imageObstacle3 = new Image();
imageObstacle3.src = "images/obstacle-3.png";

imageBackground = new Image();
imageBackground.src = 'images/bg.jpg';

imageObstacle3.onload = function() {
  //window.requestNextAnimationFrame(update);
}

              
var gameBoard = (function() {
      var defaultWidth = 900
      , defaulHeight = 600
      , defaultWidhtToHeight = 3 / 2;


      return {
        gameArea: document.getElementById("gameArea"),
        gameAreaDebug: document.getElementById("gameAreaDebug"),        
        canvas: document.getElementById("canvas"),
        debug: document.getElementById("debug"),
        canvasContext: canvas.getContext("2d"),
        canvasDebug: debug.getContext("2d"),
        world: new b2World(gravity , doSleep),
        gameObjectArray: [],
        background : new Background(),

        resize: function() {

          var newWidth = window.innerWidth;
          var newHeight = window.innerHeight;
          if ((newHeight >= defaulHeight ) && ( newWidth >= defaultWidth)){
            newWidth = defaultWidth;
            newHeight = defaulHeight;
          } else {
            var newWidthToHeight = newWidth / newHeight;

            if ( newWidthToHeight > defaultWidhtToHeight ) {
              newWidth = newHeight * defaultWidhtToHeight;
              gameArea.style.height = newHeight + 'px';
              gameArea.style.width = newWidth + 'px';
            } else { 
              newHeight = newWidth / defaultWidhtToHeight;
              gameArea.style.width = newWidth + 'px';
              gameArea.style.height = newHeight + 'px';
            }

          }
          fitToScreenX = newWidth / defaultWidth;
          fitToScreenY = newHeight / defaulHeight;
          newScale  =  newWidth / (defaultWidth / scale);
          scale = newScale; 
          

          gameArea.style.marginTop = (-newHeight / 2) + 'px';
          gameArea.style.marginLeft = (-newWidth / 2) + 'px';  
          gameAreaDebug.style.marginTop = (-newHeight / 2) + 'px';
          gameAreaDebug.style.marginLeft = (-newWidth / 2) + 'px'; 

          canvas.width = newWidth;
          canvas.height = newHeight; 
          debug.width = newWidth;
          debug.height = newHeight;

          planeTakeOff = false; 
        }

        , draw: function() {
          //Step the box2d engine ahead
          for (var i in this.gameObjectArray ) {
            if (this.gameObjectArray[i].dead == true) {
              this.gameObjectArray[i].destroy();
              delete this.gameObjectArray[i];
              plane =  (PlaneDirection == "right") ? new PlaneRight(50, 500) : plane = new PlaneLeft(50, 500);
              this.gameObjectArray.push(plane);
              planeTakeOff = false;
            } else if ( (this.gameObjectArray[i].body.GetUserData().userData == "plane") && (this.gameObjectArray[i].body.GetPosition().y * (scale / fitToScreenY) > this.canvas.height) ) {
              this.gameObjectArray[i].destroy();
              delete this.gameObjectArray[i];
              plane =  (PlaneDirection == "right") ? new PlaneRight(50, 500) : plane = new PlaneLeft(50, 500);
              this.gameObjectArray.push(plane);
              planeTakeOff = false;
            }
          }

          //document.getElementById("canvas").getContext("2d").drawImage(imageBackground, 0, 0, 900, 600,0,0,900,600);
          //world.DrawDebugData();
          document.getElementById("canvas").getContext("2d").fillRect(0,0, 900, 600);
          document.getElementById("canvas").getContext("2d").drawImage(imageTerminal, 0, 0, 200, 85, 0, 510, 200, 80);
         // document.getElementById("canvas").getContext("2d").drawImage(imageTerminal, 0, 0, 200, 85, 700, 510, 200, 80);
          document.getElementById("canvas").getContext("2d").drawImage(imageObstacle1, 0, 0, 70, 170, 415, 430, 70, 170);
          //document.getElementById("canvas").getContext("2d").drawImage(imageObstacle2, 0, 0, 247, 152, 325, 125, 250, 150);
          document.getElementById("canvas").getContext("2d").drawImage(imageObstacle3, 0, 0, 200, 48, 550, 285, 200, 50);

          document.getElementById("canvas").getContext("2d").drawImage(imagePlane, plane.body.GetPosition().x*30 - 50, plane.body.GetPosition().y*30 - 40, 100,100);
          
          this.background.draw( this.canvasContext ); 
          TWEEN.update();
          world.Step(1/60 , 8 , 3);
          world.ClearForces();
        } 
      };
      
    })();

    gameBoard.resize();


// create  world
var gravity = new b2Vec2(0, 10);
var doSleep = false;
var world = new b2World(gravity , doSleep);
world.SetContactListener(new CustomContact());

// draw takeoff
gameBoard.gameObjectArray.push(new BoardRectangleBox(100, 550, 100, 40, "takeoff"));

// draw landing
gameBoard.gameObjectArray.push(new BoardRectangleBox(800, 550, 100, 40, "landing"));

// draw upper
gameBoard.gameObjectArray.push(new BoardRectangleBox(450, 200, 125, 75, "collidable"));

// draw lower
gameBoard.gameObjectArray.push(new BoardRectangleBox(450, 515, 35, 85,  "collidable"));

gameBoard.gameObjectArray.push(new BoardRectangleBox(650, 310, 100, 25,  "collidable"));

// draw plane
plane = new PlaneRight(50, 500);

// draw takeoff
gameBoard.gameObjectArray.push(plane);

var current = {x:450 , y: 200, p: 325, q: 125,x1: 800,y1:550, p1:700,q1:510}

function update() {
  gameBoard.gameObjectArray[1].body.SetPosition(new b2Vec2(current.x1 * fitToScreenX /scale, current.y1 * fitToScreenY /scale));
  gameBoard.gameObjectArray[2].body.SetPosition(new b2Vec2(current.x * fitToScreenX /scale, current.y * fitToScreenY /scale));
   document.getElementById("canvas").getContext("2d").drawImage(imageTerminal, 0, 0, 200, 85, current.p1, current.q1, 200, 80);
  document.getElementById("canvas").getContext("2d").drawImage(imageObstacle2, 0, 0, 247, 152, current.p, current.q, 250, 150);
}

var tweenHead = new TWEEN.Tween( current )
          .to( {x:450, y: 300, p: 325, q: 225,x1:800,y1:450,p1:700,q1:410 }, 1000 )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate( update);

var tweenBack = new TWEEN.Tween( current )
          .to( {x:450, y: 200, p: 325, q: 125 ,x1:800,y1:550,p1:700,q1:510 }, 1000 )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate( update);  

// after tweenHead do tweenBack
  tweenHead.chain(tweenBack);
  // after tweenBack do tweenHead, so it is cycling
  tweenBack.chain(tweenHead);

  // start the first
  tweenHead.start();                  

//setup debug draw
debugDrawFunction();

function gameLoop(now) {
 
  gameBoard.draw();
   
  window.requestNextAnimationFrame(gameLoop);
}
gameLoop();
//BackgroundCloud();


function debugDrawFunction() {
  var debugDraw = new b2DebugDraw();
  debugDraw.SetSprite( document.getElementById( "canvas" ).getContext( "2d" ) );
  debugDraw.SetDrawScale( scale );
  debugDraw.SetFillAlpha( 0.3 );
  debugDraw.SetLineThickness( 1.0 );
  debugDraw.SetFlags( b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit );
  world.SetDebugDraw( debugDraw );

}







