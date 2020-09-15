var Background = function() {
	var stars = []
	, noOfStars = 1000
	, backgroundWidth = 900
	, backgroundHeight = 600
	, halfWidth = 450
	, halfHeight = 300
	, pointOfVertex = 250;

	for(var i = 0; i < noOfStars ; i++) {
		var star3d = [ (Math.random()*900 -450), (Math.random()*600 -300), (Math.random()* 500 -250) ];
		stars.push( star3d );
	};

	this.draw = function( contex ) {
		for(var i = 0; i < noOfStars; i++ ){
			var star3dX = stars[i][0];
			var star3dY = stars[i][1];
			var star3dZ = stars[i][2];
			var mapScale = pointOfVertex / (pointOfVertex + star3dZ) ;
			var star2dX = mapScale * star3dX + halfWidth;
			var star2dY = mapScale * star3dY + halfHeight;

			contex.linewidth = 2;
			contex.strokeStyle = "rgb(255,250,250)"; 	
			contex.beginPath();
			contex.moveTo(star2dX,star2dY); 
			contex.lineTo(star2dX + 3,star2dY ); 
			contex.stroke(); 

			stars[i][2] = stars[i][2] - 5;
			if( stars[i][2] < -250 ) stars[i][2] = +250;
		} 
	};
};


var BackgroundCloud = function() {
	var $canvas = document.getElementById("canvas");
  var $firstCanvas = document.getElementById("first");
                         
  var ctxFirst = $firstCanvas.getContext('2d');
  var ctx = $canvas.getContext('2d');
  var  w = $canvas.width, h = $canvas.height;            
  var  img = new Image();      
                        
  // A puff.
  var Puff = function(p) {                            
  var  opacity,
                  sy = (Math.random()*285)>>0,
                  sx = (Math.random()*285)>>0;
          
          this.p = p;
                          
          this.move = function(timeFac) {                                         
                  p = this.p + 0.3 * timeFac;                             
                  opacity = (Math.sin(p*0.05)*0.5);                                               
                  if(opacity <0) {
                          p = opacity = 0;
                          sy = (Math.random()*285)>>0;
                          sx = (Math.random()*285)>>0;
                  }                                                                                          
                  this.p = p;                                                                                                                                                     
                  ctxFirst.globalAlpha = opacity;                                              
                  ctxFirst.drawImage($secondCanvas, sx+p, sy+p, 285-(p*2),285-(p*2), 0,0, 900, 600);                                                         
          };
  };
                        
                        var     puffs = [];                     
                        var     sortPuff = function(p1,p2) { return p1.p-p2.p; };       
                        puffs.push( new Puff(0) );
                        puffs.push( new Puff(20) );
                        puffs.push( new Puff(40) );
                        
                        var     newTime, oldTime = 0, timeFac;
                                        
                        var     loop = function()
                        {                                                               
                                newTime = new Date().getTime();                         
                                if(oldTime === 0 ) {
                                        oldTime=newTime;
                                }
                                timeFac = (newTime-oldTime) * 0.1;
                                if(timeFac>3) {timeFac=3;}
                                oldTime = newTime;                                              
                                puffs.sort(sortPuff);                                                   
                                
                                for(var i=0;i<puffs.length;i++)
                                {
                                        puffs[i].move(timeFac); 
                                }                                       
                                ctx.drawImage( $firstCanvas ,0,0,900,900);                               
                                setTimeout(loop, 1 );                          
                        };
                        // Turns out Chrome is much faster doing bitmap work if the bitmap is in an existing canvas rather
                        // than an IMG, VIDEO etc. So draw the big nebula image into canvas3
                         var $secondCanvas = document.getElementById("second");
                        var  ctx3 = $secondCanvas.getContext('2d');
                        img.onload = function() {  
                        	ctx3.drawImage(img, 0,0, 900, 600);    
                        	loop();
                        };
                        img.src = 'images/bg1.jpg';
}