var graphicsComponent = require("../components/graphics/edge");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/edge");

var TopEdge = function(){
	console.log("Creating top edge entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 1;

	var graphics = new graphicsComponent.EdgeGraphicsComponent(this);
	var collision = new collisionComponent.EdgeCollisionComponent(this);

	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

exports.TopEdge = TopEdge;