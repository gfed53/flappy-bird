var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(x,y){
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = y;
	physics.velocity.x = -0.5;

	this.components = {
		physics: physics
	};

	var rectHeightValue = function(y){
		if(y>0){
			return 1-y;
		} else{
			return 1;
		}
	};

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);

	var collision = new collisionComponent.RectCollisionComponent(this, {x: 0.25, y: rectHeightValue(this.components.physics.position.y)});


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

exports.Pipe = Pipe;