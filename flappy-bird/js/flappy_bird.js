// Systems
var graphicsSystem = require("./systems/graphics");
var physicsSystem = require("./systems/physics");
var inputSystem = require("./systems/input");

// Entities
var bird = require("./entities/bird");
var pipe = require("./entities/pipe");

var pipeTop = new pipe.Pipe(1,0.75)
	pipeBottom = new pipe.Pipe(1,-0.75);

var FlappyBird = function(){
	this.entities = [new bird.Bird()/*, pipeTop, pipeBottom*/];
	this.pipes = [pipeTop, pipeBottom];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
};

// FlappyBird.prototype.createNewPipes = function(){
// 	window.setInterval(this.newPipes.bind(this), 2000);
// 	console.log(this.entities);
// 	this.graphics.PipeGraphicsComponent.draw(this.context);
// };

FlappyBird.prototype.run = function(){
	this.graphics.run();
	this.physics.run();
	this.input.run();
	this.graphics.createPipes();
};

exports.FlappyBird = FlappyBird;
