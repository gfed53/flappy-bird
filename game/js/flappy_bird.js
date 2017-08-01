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
	this.html = document.querySelector("html");
};

FlappyBird.prototype.run = function(){
	this.physics.run();
	this.graphics.run();
	this.graphics.runClear();
	this.input.run();
	this.entities[0].countDown();
};

exports.FlappyBird = FlappyBird;
