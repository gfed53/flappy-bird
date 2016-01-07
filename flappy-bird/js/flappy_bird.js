// Systems
var graphicsSystem = require("./systems/graphics");
var physicsSystem = require("./systems/physics");
var inputSystem = require("./systems/input");
var collisionSystem = require("./systems/collision");

// Entities
var bird = require("./entities/bird");
var pipe = require("./entities/pipe");
var topEdge = require("./entities/top-edge");
var bottomEdge = require("./entities/bottom-edge");

var FlappyBird = function(){
	this.entities = [new bird.Bird(), new topEdge.TopEdge(), new bottomEdge.BottomEdge()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
	this.collision = new collisionSystem.CollisionSystem(this.entities);
};

FlappyBird.prototype.run = function(){
	this.graphics.run();
	this.graphics.createPipes();
	this.graphics.runClear();
	this.physics.run();
	this.input.run();
	console.log(this.entities[0].components.status);
};

exports.FlappyBird = FlappyBird;
