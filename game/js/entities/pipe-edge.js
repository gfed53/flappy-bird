var graphicsComponent = require("../components/graphics/pipe-edge");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/pipe-edge");

var PipeEdge = function(x){
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = 0;
	physics.velocity.x = -0.5;

	var graphics = new graphicsComponent.PipeEdgeGraphicsComponent(this);

	var collision = new collisionComponent.PipeEdgeCollisionComponent(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

exports.PipeEdge = PipeEdge;