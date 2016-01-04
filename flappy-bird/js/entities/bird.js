var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var graphicsSystem = require("../systems/graphics");
//What is 'settings'?
// var settings = require("../settings");

var Bird = function(){
	console.log("Creating bird entity");

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = -2;

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	//What exactly does this do? 
	collision.onCollision = this.onCollision.bind(this);

	this.components= {
		physics: physics,
		graphics: graphics,
		collision: collision
	};
};

Bird.prototype.onCollision = function(entity) {
	console.log("Bird collided with entity:", entity);
	// console.log(FlappyBird.entities);
	// this.physics.position.x = 0;
	// this.physics.position.y = 0.5;

	
};

exports.Bird = Bird;