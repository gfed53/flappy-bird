// Systems
var graphicsSystem = require("./systems/graphics");
var physicsSystem = require("./systems/physics");
var inputSystem = require("./systems/input");
var collisionSystem = require("./systems/collision");

// Entities
var bird = require("./entities/bird");
var pipe = require("./entities/pipe");

var FlappyBird = function(){
	this.entities = [new bird.Bird()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
	this.collision = new collisionSystem.CollisionSystem(this.entities);
};

FlappyBird.prototype.run = function(){
	this.graphics.run();
	this.graphics.createPipes();
	this.physics.run();
	this.input.run();
	// this.collision.run();
	

};

exports.FlappyBird = FlappyBird;
