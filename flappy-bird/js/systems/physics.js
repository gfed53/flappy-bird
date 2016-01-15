var collisionSystem = require("./collision");

var PhysicsSystem = function(entities){
	this.entities = entities;
	this.collisionSystem = new collisionSystem.CollisionSystem(entities);
	this.count = 0;
};

PhysicsSystem.prototype.run = function(){
	// Run the update loop
	window.setInterval(this.tick.bind(this), 1000 /60);
	this.runControlBird();
};

//Counter
PhysicsSystem.prototype.counter = function(){
	this.count+=1;
	console.log(this.count);
}

PhysicsSystem.prototype.countDown = function(){
	window.setInterval(this.counter.bind(this), 1000);
}

PhysicsSystem.prototype.reset = function(){
	if(this.entities[0].components.status === 1){
		console.log("reset");
		this.count = 0;
		this.entities[0].components.physics.acceleration.y = 0;
	}
}

PhysicsSystem.prototype.runControlBird = function(){
	console.log(this.entities[0].components.physics.acceleration.y);
	window.setInterval(this.controlBird.bind(this), 1000);
}

PhysicsSystem.prototype.controlBird = function(){
	console.log("running");
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
	this.reset();
};

exports.PhysicsSystem = PhysicsSystem;