// Systems
var graphicsSystem = require("./systems/graphics");
var physicsSystem = require("./systems/physics");
var inputSystem = require("./systems/input");

// Entities
var bird = require("./entities/bird");
var pipe = require("./entities/pipe");

var pipeTop = new pipe.Pipe(1,0.75)
	pipeBottom = new pipe.Pipe(1,-0.75);
	x = function(){
		console.log("report");
	}

var FlappyBird = function(){
	this.entities = [new bird.Bird(), pipeTop, pipeBottom];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.newPipes = function(){
	this.entities += pipeTop;
	this.entities += pipeBottom;
	console.log(this.entities);
}

// var createNewPipes = function(){
// 	window.setInterval(newPipes, 2000);
// }

FlappyBird.prototype.run = function(){
	this.graphics.run();
	this.physics.run();
	this.input.run();
	this.graphics.create(pipeTop);
};

exports.FlappyBird = FlappyBird;
