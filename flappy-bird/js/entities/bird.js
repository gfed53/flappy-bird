var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");

var Bird = function(){
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = 0;

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	collision.onCollision = this.onCollision.bind(this);
	var status = "none";
	var pipes = "in motion";
	var paused = false;
	var count = 0;

	this.components= {
		physics: physics,
		graphics: graphics,
		collision: collision,
		status: status,
		pipes: pipes,
		paused: paused,
		count: count
	};
};

Bird.prototype.onCollision = function(entity) {
	if(entity.components.collision.type === "pipe-edge"){
		this.components.status = "point";
	} else {
		this.components.physics.position.x = 0;
		this.components.physics.position.y = 0.5;
		this.components.physics.velocity.y = 0;
		this.components.status = "collide";
		this.components.pipes = "stopped";
	}
};


//Counter
Bird.prototype.counter = function(){
	if(this.components.paused === true){
		this.components.count = 0;
	} else{
		this.components.count+=0.1;
	}
};

Bird.prototype.uiCounterDisplay = function(){
	if(this.components.paused === true){
		$("#ready").html("Paused");
	} else if(this.components.count<5){
		var viewCount = parseInt(5-this.components.count);
		$("#ready").html(viewCount);
	} else {
		$("#ready").html("Go!");
	}
};

Bird.prototype.countDown = function(){
	window.setInterval(this.counter.bind(this), 100);
	window.setInterval(this.uiCounterDisplay.bind(this), 100);
};



exports.Bird = Bird;