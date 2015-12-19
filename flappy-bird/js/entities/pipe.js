var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function(x,y){
	console.log("Creating pipe entity");

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = y;
	physics.acceleration.x = -0.05;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components= {
		graphics: graphics,
		physics: physics,
	};
};

exports.Pipe = Pipe;