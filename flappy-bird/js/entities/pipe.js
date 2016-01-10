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

	this.components = {
		physics: physics
	};

	var rectHeightValue = function(y){
		if(y>0){
			return 1-y;
		} else{
			return 1+y;
		}
	};

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);

	var collision = new collisionComponent.RectCollisionComponent(this, {x: 0.25, y: rectHeightValue(this.components.physics.position.y)});
	collision.onCollision = this.onCollision.bind(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};

	console.log(this.components.physics.position.y);
};

Pipe.prototype.onCollision = function(entity) {
	// console.log("Pipe collided with entity:", entity);
	// console.log(this.components.physics.position.x + ", "+this.components.physics.position.y);
};

exports.Pipe = Pipe;