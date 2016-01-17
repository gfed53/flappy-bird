// Systems
var graphicsSystem = require("./systems/graphics");
var physicsSystem = require("./systems/physics");
var inputSystem = require("./systems/input");
var collisionSystem = require("./systems/collision");
var scoreSystem = require("./systems/score");

// Entities
var bird = require("./entities/bird");
var pipe = require("./entities/pipe");
var topEdge = require("./entities/top-edge");
var bottomEdge = require("./entities/bottom-edge");
var pipeEdge = require("./entities/pipe-edge");



var FlappyBird = function(){
	this.entities = [new bird.Bird(), new topEdge.TopEdge(), new bottomEdge.BottomEdge()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
	this.collision = new collisionSystem.CollisionSystem(this.entities);
	this.html = document.querySelector('html');
	this.paused = false;
};



FlappyBird.prototype.run = function(){
	this.physics.run();
	this.physics.countDown();
	this.graphics.run();
	this.graphics.countDown();
	this.graphics.runClear();
	// this.graphics.createPipes();
	this.input.run();
	this.pauseListen();
	// console.log(this.entities[0].components.status);
};

FlappyBird.prototype.pauseListen = function(){
	this.html.addEventListener('keydown', this.onKeyDown.bind(this), false);
}

FlappyBird.prototype.onKeyDown = function(){
	if(this.paused === false){
		console.log("pause");
		this.graphics.count = 0;
		this.physics.count = 0;
		this.entities[0].components.physics.acceleration.y = 0;
		this.entities[0].components.physics.velocity.y = 0;
		// console.log(this.graphics.count);
		for(var i=3; i<this.entities.length; i++){
			var entity = this.entities[i];
			console.log(entity);
			entity.components.physics.acceleration.x = 0;
			entity.components.physics.velocity.x = 0;
		}

		this.paused = true;
	} else {
		this.paused = false;
		console.log("unpaused");
		// this.entities[0].components.physics.acceleration.y = -2;
		for(var i=3; i<this.entities.length; i++){
			var entity = this.entities[i];
			console.log(entity);
			entity.components.physics.acceleration.x = -0.01;
			entity.components.physics.velocity.x = -0.02;
			// console.log(this.entities[i]);
		}
		// this.entities[0].components.physics.acceleration.y = -2;
	}
	// e.preventDefault();
	// window.clearInterval(this.physics.run.bind(this));
	
	console.log(this.entities[0]);
};

exports.FlappyBird = FlappyBird;
