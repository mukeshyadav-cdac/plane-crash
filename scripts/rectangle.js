rectangleBox = function(x,y,xWidth,yHeight,userData) {
  var bodyDef = new b2BodyDef();
  var polygonShape = new b2PolygonShape();
  var fixtureDef = new b2FixtureDef();
  fixtureDef.shape = polygonShape;
  fixtureDef.restitution = 0.4;
  fixtureDef.friction = 0.5; 

  bodyDef.position.Set( x * fitToScreenX /scale, y * fitToScreenY /scale );
  polygonShape.SetAsBox( xWidth * fitToScreenX /scale, yHeight * fitToScreenY /scale );

  bodyDef.userData = userData;
  var body = world.CreateBody( bodyDef );
  body.CreateFixture( fixtureDef );

  return body;
}

BoardRectangleBox = function( x, y, xWidth, yHeight, userData) {
  this.body = rectangleBox(x,y,xWidth,yHeight,{userData: userData, object: this});
}


