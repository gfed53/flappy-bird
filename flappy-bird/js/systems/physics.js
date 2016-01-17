var collisionSystem = require("./collision");
var score = require("./score");

var PhysicsSystem = function(entities){
	this.entities = entities;
	this.collisionSystem = new collisionSystem.CollisionSystem(entities);
	this.score = new score.Score(entities);
	this.count = 0;
};

PhysicsSystem.prototype.run = function(){
	// Run the update loop
	window.setInterval(this.tick.bind(this), 1000 /60);
	this.runControlBird();
	//Runs our check for a locally stored high score on startup
	this.score.get();
};

//Counter
PhysicsSystem.prototype.counter = function(){
	this.count+=1;
	console.log("physics: "+this.count);
}

PhysicsSystem.prototype.countDown = function(){
	window.setInterval(this.counter.bind(this), 1000);
}

PhysicsSystem.prototype.reset = function(){
	if(this.entities[0].components.status === "collide"){
		console.log("reset");
		this.count = 0;
		this.entities[0].components.physics.acceleration.y = 0;
		this.entities[0].components.status = "none";
	}
}

PhysicsSystem.prototype.runControlBird = function(){
	// console.log(this.entities[0].components.physics.acceleration.y);
	window.setInterval(this.controlBird.bind(this), 1000);
}

PhysicsSystem.prototype.controlBird = function(){
	// console.log("running");
	if(this.count>5){
		this.entities[0].components.physics.acceleration.y = -2;
		// console.log(this.entities[0].components.physics.acceleration.y);
	}
	//Still need to reset counter to 0!
};


PhysicsSystem.prototype.tick = function(){
	for(var i=0; i<this.entities.length; i++){
		var entity = this.entities[i];
		if (!"physics" in entity.components){
			continue;
		}

		entity.components.physics.update(1/60);
	}

	this.collisionSystem.tick();
	this.score.update();
	this.reset();
	
	
};

exports.PhysicsSystem = PhysicsSystem;