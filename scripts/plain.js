addPlaneRight = function( x, y, object) {

  var bodyDef = new b2BodyDef();
  bodyDef.position.Set(x * fitToScreenX/scale, y * fitToScreenY/scale);
  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.userData= {userData: "plane", object:object};
  
  var polygonShape = new b2PolygonShape();
  polygonShape.SetAsBox(30 * fitToScreenX/scale, 5 * fitToScreenY/scale);

  var fixtureDef = new b2FixtureDef();
  fixtureDef.shape=polygonShape;
  fixtureDef.density=1;
  fixtureDef.restitution=0.4;
  fixtureDef.friction=0.5;

  var plane = world.CreateBody(bodyDef);
  plane.CreateFixture(fixtureDef);

  var tail = new Vector();
  tail.push(new b2Vec2(-30 * fitToScreenX/scale, -5 * fitToScreenY/scale));
  tail.push(new b2Vec2(-30 * fitToScreenX/scale, 5 * fitToScreenY/scale));
  tail.push(new b2Vec2( -50 * fitToScreenX/scale, 0));
  polygonShape.SetAsVector(tail, 3);
  fixtureDef.density=0.1;
  fixtureDef.shape = polygonShape;
  plane.CreateFixture(fixtureDef);

  var head = new Vector();
  head.push(new b2Vec2(30 * fitToScreenX/scale, -5 * fitToScreenY/scale));
  head.push(new b2Vec2(50 * fitToScreenX/scale, 2 * fitToScreenY/scale));
  head.push(new b2Vec2(30 * fitToScreenX/scale, 5 * fitToScreenY/scale));
  polygonShape.SetAsVector(head, 3);
  fixtureDef.density=0.1;
  fixtureDef.shape = polygonShape;
  plane.CreateFixture(fixtureDef);

  var topWing = new Vector();
  topWing.push(new b2Vec2(-28 * fitToScreenX/scale, -5 * fitToScreenY/scale));
  topWing.push(new b2Vec2(-28 * fitToScreenX/scale, -30 * fitToScreenY/scale));
  topWing.push(new b2Vec2( -18 * fitToScreenX/scale, -5 * fitToScreenY/scale));
  polygonShape.SetAsVector(topWing, 3);
  fixtureDef.shape = polygonShape;
  plane.CreateFixture(fixtureDef);

  var sideWing = new Vector();
  sideWing.push(new b2Vec2(-28 * fitToScreenX/scale, 0));
  sideWing.push(new b2Vec2(-18 * fitToScreenX/scale, 0));
  sideWing.push(new b2Vec2(-40 * fitToScreenX/scale, 10 * fitToScreenY/scale));
  polygonShape.SetAsVector(sideWing, 3);
  fixtureDef.shape = polygonShape;
  plane.CreateFixture(fixtureDef);

  return plane; 
  
}



PlaneRight = function(x, y) {
  this.x = x;
  this.y = y;
  this.dead = false;
  this.componetObject = [];

  this.componetObject.push( addPlaneRight( this.x, this.y, this) );
  this.componetObject.push( addWheel( this.x + 15, this.y + 5) );
  this.componetObject.push( addWheel( this.x - 15, this.y + 5) );

  var rJoint = new b2RevoluteJointDef();

  rJoint.enableMotor=true;
  rJoint.maxMotorTorque=1000;
  rJoint.motorSpeed=5;

  
  rJoint.bodyA = this.componetObject[0];
  rJoint.bodyB = this.componetObject[1];
  rJoint.localAnchorA.Set(15 * fitToScreenX/scale,5 * fitToScreenY/scale);
  rJoint.localAnchorB.Set(0,0);
  this.componetObject.push( world.CreateJoint(rJoint) );

  rJoint.bodyB = this.componetObject[2];;
  rJoint.localAnchorA.Set(-15 * fitToScreenX /scale, 5 * fitToScreenY/scale);
  this.componetObject.push( world.CreateJoint(rJoint) );

  this.body = this.componetObject[0];
  
}
  
PlaneRight.prototype.destroy = function() { 
  for(var j = 0 ; j < this.componetObject.length ; j++ ) {
    world.DestroyBody(this.componetObject[j]);
  }
}
//////////////////////////////////////////////////////////////////////

addPlaneLeft = function( x, y, object) {

  var bodyDef = new b2BodyDef();
  bodyDef.position.Set(x * fitToScreenX/scale, y * fitToScreenY/scale);
  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.userData= {userData: "plane", object:object};
  
  var polygonShape = new b2PolygonShape();
  polygonShape.SetAsBox(30 * fitToScreenX/scale, 5 * fitToScreenY/scale);

  var fixtureDef = new b2FixtureDef();
  fixtureDef.shape=polygonShape;
  fixtureDef.density=1;
  fixtureDef.restitution=0.4;
  fixtureDef.friction=0.5;

  var plane = world.CreateBody(bodyDef);
  plane.CreateFixture(fixtureDef);

  var tail = new Vector();
  tail.push(new b2Vec2(-30 * fitToScreenX/scale, -5 * fitToScreenY/scale));
  tail.push(new b2Vec2(-30 * fitToScreenX/scale, 5 * fitToScreenY/scale));
  tail.push(new b2Vec2( -50 * fitToScreenX/scale, 0));
  polygonShape.SetAsVector(tail, 3);
  fixtureDef.density=0.1;
  fixtureDef.shape = polygonShape;
  plane.CreateFixture(fixtureDef);

  var head = new Vector();
  head.push(new b2Vec2(30 * fitToScreenX/scale, -5 * fitToScreenY/scale));
  head.push(new b2Vec2(50 * fitToScreenX/scale, 2 * fitToScreenY/scale));
  head.push(new b2Vec2(30 * fitToScreenX/scale, 5 * fitToScreenY/scale));
  polygonShape.SetAsVector(head, 3);
  fixtureDef.density=0.1;
  fixtureDef.shape = polygonShape;
  plane.CreateFixture(fixtureDef);

  var topWing = new Vector();
  topWing.push(new b2Vec2(+28 * fitToScreenX/scale, -5 * fitToScreenY/scale));
  topWing.push(new b2Vec2(+28 * fitToScreenX/scale, -30 * fitToScreenY/scale));
  topWing.push(new b2Vec2( +18 * fitToScreenX/scale, -5 * fitToScreenY/scale));
  polygonShape.SetAsVector(topWing, 3);
  fixtureDef.shape = polygonShape;
  plane.CreateFixture(fixtureDef);

  var sideWing = new Vector();
  sideWing.push(new b2Vec2(+28 * fitToScreenX/scale, 0));
  sideWing.push(new b2Vec2(+18 * fitToScreenX/scale, 0));
  sideWing.push(new b2Vec2(+40 * fitToScreenX/scale, 10 * fitToScreenY/scale));
  polygonShape.SetAsVector(sideWing, 3);
  fixtureDef.shape = polygonShape;
  plane.CreateFixture(fixtureDef);

  return plane; 
  
}

PlaneLeft = function(x, y) {
  this.x = x;
  this.y = y;
  this.dead = false;
  this.componetObject = [];

  this.componetObject.push( addPlaneLeft( this.x, this.y, this) );
  this.componetObject.push( addWheel( this.x + 15, this.y + 5) );
  this.componetObject.push( addWheel( this.x - 15, this.y + 5) );

  var rJoint = new b2RevoluteJointDef();

  rJoint.enableMotor=true;
  rJoint.maxMotorTorque=1000;
  rJoint.motorSpeed=-5;

  
  rJoint.bodyA = this.componetObject[0];
  rJoint.bodyB = this.componetObject[1];
  rJoint.localAnchorA.Set(15 * fitToScreenX/scale,5 * fitToScreenY/scale);
  rJoint.localAnchorB.Set(0,0);
  this.componetObject.push( world.CreateJoint(rJoint) );

  rJoint.bodyB = this.componetObject[2];;
  rJoint.localAnchorA.Set(-15 * fitToScreenX /scale, 5 * fitToScreenY/scale);
  this.componetObject.push( world.CreateJoint(rJoint) );
  
  this.body = this.componetObject[0];
  
}
  
PlaneLeft.prototype.destroy = function() { 
  for(var j = 0 ; j < this.componetObject.length ; j++ ) {
    world.DestroyBody(this.componetObject[j]);
  }
}



addWheel = function(pX, pY) {
  var bodyDef = new b2BodyDef();
  bodyDef.position.Set(pX * fitToScreenX/scale, pY/scale);
  bodyDef.type = b2Body.b2_dynamicBody;
  var circleShape = new b2CircleShape(7 * fitToScreenY/scale);
  var fixtureDef = new b2FixtureDef();
  fixtureDef.shape = circleShape;
  fixtureDef.density = 0.1;
  fixtureDef.restitution = 0.5;
  fixtureDef.friction = 0.5;
  bodyDef.userData= "wheel";
  var body = world.CreateBody(bodyDef);
  body.CreateFixture(fixtureDef);
  return body;
}
