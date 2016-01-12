var graphicsComponent = require("../components/graphics/edge");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/edge");

var BottomEdge = function(){
	console.log("Creating bottom edge entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0;

	var graphics = new graphicsComponent.EdgeGraphicsComponent(this);
	var collision = new collisionComponent.EdgeCollisionComponent(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

exports.BottomEdge = BottomEdge;