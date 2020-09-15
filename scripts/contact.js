
function CustomContact(){

}

CustomContact.prototype = new b2ContactListener();

CustomContact.prototype.BeginContact = function(contact) {

};

CustomContact.prototype.EndContact = function(contact) {
 
}

CustomContact.prototype.PreSolve = function(contact, oldManifold) {
}

CustomContact.prototype.PostSolve = function(contact, impulse) {
  var fixtureA = contact.GetFixtureA();
  var fixtureB = contact.GetFixtureB();
  var dataA = fixtureA.GetBody().GetUserData();
  var dataB = fixtureB.GetBody().GetUserData();
  var force = impulse.normalImpulses[0];
  if ( (dataA.userData == "plane" && dataB.userData == "collidable")) {
     dataA.object.dead = true;
  }
  if ( (dataA.userData == "plane" && dataB.userData == "landing")) {
  
   if( fixtureA.GetBody().GetAngle() > (Math.PI /6) ) {
     dataA.object.dead = true;
   } else {
     planeTakeOff = false;
   }
     
  }

}

