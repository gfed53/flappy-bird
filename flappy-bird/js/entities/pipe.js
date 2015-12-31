var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
// var settings = require("../settings");

var Pipe = function(x,y){
	console.log("Creating pipe entity");

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = y;
	physics.velocity.x = -0.2;
	physics.acceleration.x = -0.1;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);

	var collision = new collisionComponent.RectCollisionComponent(this, {x: 0.25, y: 0.25});
	collision.onCollision = this.onCollision.bind(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

Pipe.prototype.onCollision = function(entity) {
	console.log("Pipe collided with entity:", entity);
	console.log(this.components.physics.position.x + ", "+this.components.physics.position.y);
};

// var pipeTop = new Pipe(1,0.75)
// 	pipeBottom = new Pipe(1,-0.75);

// var pipes = [pipeTop, pipeBottom];

exports.Pipe = Pipe;
// exports.pipes = pipes;
// exports.pipeBottom = pipeBottom;