var collisionSystem = require("./collision");
var score = require("./score");

var PhysicsSystem = function(entities){
	this.entities = entities;
	this.collisionSystem = new collisionSystem.CollisionSystem(entities);
	this.score = new score.Score(entities);
};

PhysicsSystem.prototype.run = function(){
	// Run the update loop, control loop for our entities
	window.setInterval(this.tick.bind(this), 1000 /60);
	this.runControl();
	//Runs our check for a locally stored high score on startup
	this.score.get();

};

//Upon collision, bird entity resets its position and count
PhysicsSystem.prototype.reset = function(){
	if(this.entities[0].components.status === "collide"){
		this.entities[0].components.count = 0;
		this.entities[0].components.physics.acceleration.y = 0;
		this.entities[0].components.status = "none";
	}
};

//Control loop that bases velocity/acceleration on count
PhysicsSystem.prototype.runControl = function(){
	window.setInterval(this.controlBird.bind(this), 1/60);
	window.setInterval(this.controlPipes.bind(this), 1/60);
};

//Control loop for bird
PhysicsSystem.prototype.controlBird = function(){
	if(this.entities[0].components.count>5){
		this.entities[0].components.physics.acceleration.y = -2;
	} else {
		this.entities[0].components.physics.acceleration.y = 0;
		this.entities[0].components.physics.velocity.y = 0;
	}
};

//Control loop for pipes
PhysicsSystem.prototype.controlPipes = function(){
	for(var i=3; i<this.entities.length; i++){
		var entity = this.entities[i];
		entityVeloc = this.entities[i].components.physics.velocity.x;
		if(this.entities[0].components.count>35){
			entity.components.physics.velocity.x = -0.8;
		} else if(this.entities[0].components.count>5){
				entity.components.physics.velocity.x = -0.5;
			} else if(this.entities[0].components.count<=5) {
				entity.components.physics.velocity.x = 0;
			}
		}
	};

	//Tick loop that updates physics of entities, as well as score. Also, a constant check for any collision.
	PhysicsSystem.prototype.tick = function(){
		console.log('physics tick');
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