var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
//What is 'settings'?
// var settings = require("../settings");

var Bird = function(){
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = -2;

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	//What exactly does this do? 
	collision.onCollision = this.onCollision.bind(this);
	var status = 0;

	this.components= {
		physics: physics,
		graphics: graphics,
		collision: collision,
		status: status
	};
};

Bird.prototype.onCollision = function(entity) {
	// console.log("Bird collided with entity:", entity);
	// console.log(this.components.physics);
	// GraphicsSystem.clearCanvas();
	this.components.physics.position.x = 0;
	this.components.physics.position.y = 0.5;
	this.components.status = 1;
	
	
};

exports.Bird = Bird;