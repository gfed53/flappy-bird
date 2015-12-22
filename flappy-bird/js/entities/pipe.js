var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function(x,y){
	console.log("Creating pipe entity");

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = y;
	physics.velocity.x = -0.1;
	physics.acceleration.x = -0.15;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components= {
		graphics: graphics,
		physics: physics,
	};
};

// var pipeTop = new Pipe(1,0.75)
// 	pipeBottom = new Pipe(1,-0.75);

// var pipes = [pipeTop, pipeBottom];

exports.Pipe = Pipe;
// exports.pipes = pipes;
// exports.pipeBottom = pipeBottom;