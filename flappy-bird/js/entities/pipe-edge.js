// var graphicsComponent = require("../components/graphics/pipe");
// var physicsComponent = require("../components/physics/physics");
// var collisionComponent = require("../components/collision/rect");
// var settings = require("../settings");

var PipeEdge = function(x){
	console.log("Creating pipe entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = 0;
	physics.velocity.x = -0.2;
	physics.acceleration.x = -0.1;

	var graphics = new graphicsComponent.PipeEdgeGraphicsComponent(this);

	var collision = new collisionComponent.PipeCollisionComponent(this, {x: 0.25, y: 0.25});
	collision.onCollision = this.onCollision.bind(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

// PipeEdge.prototype.onCollision = function(entity) {
// 	// console.log("Pipe collided with entity:", entity);
// 	// console.log(this.components.physics.position.x + ", "+this.components.physics.position.y);
// };

exports.PipeEdge = PipeEdge;