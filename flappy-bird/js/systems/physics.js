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
	// this.score.clearLocalHigh();
	this.score.get();

};

//Counter(unused)
// PhysicsSystem.prototype.counter = function(){
// 	if(this.entities[0].components.status === "pause"){
// 		this.count = 0;
// 	} else{
// 		this.count+=1;
// 	}
// 	console.log("physics: "+this.count);
// }

// PhysicsSystem.prototype.countDown = function(){
// 	window.setInterval(this.counter.bind(this), 1000);
// 	// console.log("physics ID "+window.setInterval(this.counter.bind(this), 1000));
// }

// PhysicsSystem.prototype.stopCount = function(){
// 	window.clearInterval(4);
// }

//Upon collision, bird entity resets its position and count
PhysicsSystem.prototype.reset = function(){
	if(this.entities[0].components.status === "collide"){
		console.log("reset");
		this.entities[0].components.count = 0;
		this.entities[0].components.physics.acceleration.y = 0;
		this.entities[0].components.status = "none";
	}
};

//Control loop that bases velocity/acceleration on count
PhysicsSystem.prototype.runControl = function(){
	// console.log(this.entities[0].components.physics.acceleration.y);
	window.setInterval(this.controlBird.bind(this), 1/60);
	window.setInterval(this.controlPipes.bind(this), 1/60);
};

//Control loop for bird
PhysicsSystem.prototype.controlBird = function(){
	// console.log("running");
	//To Change
	if(this.entities[0].components.count>5){
		this.entities[0].components.physics.acceleration.y = -2;
		// console.log(this.entities[0].components.physics.acceleration.y);
	} else {
		this.entities[0].components.physics.acceleration.y = 0;
		this.entities[0].components.physics.velocity.y = 0;
	}
	// else {
	// 	this.entities[0].components.physics.acceleration.y = 0;
	// }
	//Still need to reset counter to 0!
};

//Control loop for pipes
//In refactoring, maybe use a switch?
PhysicsSystem.prototype.controlPipes = function(){
	for(var i=3; i<this.entities.length; i++){
		var entity = this.entities[i];
		entityVeloc = this.entities[i].components.physics.velocity.x;
		if(this.entities[0].components.count>35){
			entity.components.physics.velocity.x = -0.8;
		}
		else if(this.entities[0].components.count>5){
				// entity.components.physics.acceleration.x = -0.1;
				entity.components.physics.velocity.x = -0.5;

			} else if(this.entities[0].components.count<5) {
				// entity.components.physics.acceleration.x = 0;
				entity.components.physics.velocity.x = 0;
			}
			
			// console.log(this.entities[i]);
		}
	};

	//Tick loop that updates physics of entities, as well as score. frequently. Also, constant check for any collision is run.
	PhysicsSystem.prototype.tick = function(){
		for(var i=0; i<this.entities.length; i++){
			var entity = this.entities[i];
			if (!"physics" in entity.components){
				continue;
			}

			entity.components.physics.update(1/60);
		// console.log(entity.components.physics.acceleration.x);
		// console.log(entity.components.physics.velocity.x);
	}

	this.collisionSystem.tick();
	this.score.update();
	this.reset();
	// console.log(this.entities[4].components.physics.acceleration.x);
	// console.log(this.entities[4].components.physics.velocity.x);
	
};

exports.PhysicsSystem = PhysicsSystem;