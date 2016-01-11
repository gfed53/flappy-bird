var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
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
	var status = 0;

	this.components= {
		physics: physics,
		graphics: graphics,
		collision: collision,
		status: status
	};
};

Bird.prototype.onCollision = function(entity) {
	console.log("Bird collided with entity:", entity);
	console.log(entity.components.collision.type);
	if(entity.components.collision.type === "pipe-edge"/*|| entity.components.collision.type === "edge"*/){
		console.log("Increase score by 1");
		var score = $("#pipes-flown-through").text();
		// console.log(score);
		var scoreInt = parseFloat(score);
		// console.log(scoreInt);
		scoreInt+=0.5;
		// console.log(scoreInt);
		score = String(scoreInt);
		$("#pipes-flown-through").text(score);
	} else {
		console.log("Should reset");
		this.components.physics.position.x = 0;
		this.components.physics.position.y = 0.5;
		this.components.physics.velocity.y = 0;
		this.components.status = 1;
		$("#pipes-flown-through").text("0");
	}
	
	
	
};

exports.Bird = Bird;