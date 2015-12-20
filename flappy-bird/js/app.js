(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
	this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.arc(0, 0, 0.02, 0, 2 * Math.PI);
	context.fill();
	context.closePath();
	// console.log("Drawing a bird.");
	context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],2:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.fillRect(0, 0, 0.25, 1);
	// console.log("Drawing a pipe.");
	context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],3:[function(require,module,exports){
var PhysicsComponent = function(entity) {
	this.entity = entity;

	this.position = {
		x:0,
		y:0
	};
	this.velocity = {
		x:0,
		y:0
	};
	this.acceleration = {
		x:0,
		y:0
	};
};

PhysicsComponent.prototype.update = function(delta){
	this.velocity.x += this.acceleration.x * delta;
	this.velocity.y += this.acceleration.y * delta;

	this.position.x += this.velocity.x * delta;
	this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],4:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");

var Bird = function(){
	console.log("Creating bird entity");

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = -2;

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);

	this.components= {
		physics: physics,
		graphics: graphics,
	};
};

exports.Bird = Bird;
},{"../components/graphics/bird":1,"../components/physics/physics":3}],5:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function(x,y){
	console.log("Creating pipe entity");

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = y;
	physics.velocity.x = -0.1;
	physics.acceleration.x = -0.15;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components= {
		graphics: graphics,
		physics: physics,
	};
};

var pipeTop = new Pipe(1,0.75)
	pipeBottom = new Pipe(1,-0.75);

var pipes = [pipeTop, pipeBottom];

exports.Pipe = Pipe;
exports.pipes = pipes;
exports.pipeBottom = pipeBottom;
},{"../components/graphics/pipe":2,"../components/physics/physics":3}],6:[function(require,module,exports){
// Systems
var graphicsSystem = require("./systems/graphics");
var physicsSystem = require("./systems/physics");
var inputSystem = require("./systems/input");

// Entities
var bird = require("./entities/bird");
var pipe = require("./entities/pipe");

// var pipeTop = new pipe.Pipe(1,0.75)
// 	pipeBottom = new pipe.Pipe(1,-0.75);

var FlappyBird = function(){
	this.entities = [new bird.Bird()/*, pipeTop, pipeBottom*/];
	// this.pipes = [pipeTop, pipeBottom];
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

},{"./entities/bird":4,"./entities/pipe":5,"./systems/graphics":8,"./systems/input":9,"./systems/physics":10}],7:[function(require,module,exports){
//On page load...
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flappyBird.FlappyBird();
	app.run();
});
},{"./flappy_bird":6}],8:[function(require,module,exports){
var pipe = require("../entities/pipe");
var pipes = pipe.pipes;
// var pipeGraphics = require("../graphics/pipe");

var GraphicsSystem = function(entities) {
	this.entities = entities;
	// Canvas is where we draw
	this.canvas = document.getElementById('main-canvas');
	// Context is what we draw to
	this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function(){
	// Tick the graphics system a few times to see it in action
	// for (var i=0; i<5; i++) {
	// 	this.tick();
	// }

	// Run the render loop
	window.requestAnimationFrame(this.tick.bind(this));
};

// GraphicsSystem.prototype.create = function(){
// 	window.setInterval(this.create.bind(this), 2000);
// }

GraphicsSystem.prototype.tick = function() {
	// Set the canvas to the correct size if the window is resized
	if (this.canvas.width != this.canvas.offsetWidth ||
		this.canvas.height != this.canvas.offsetHeight) {
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
	}
	
	// Clear the canvas
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.context.save();
	this.context.translate(this.canvas.width / 2, this.canvas.height);
	this.context.scale(this.canvas.height, -this.canvas.height);

	//Rendering goes here
	for(var i=0; i<this.entities.length; i++){
		var entity = this.entities[i];
		if (!"graphics" in entity.components){
			continue;
		}

		entity.components.graphics.draw(this.context);
	}

	this.context.restore();
	// Continue the render loop
	window.requestAnimationFrame(this.tick.bind(this));	
};

GraphicsSystem.prototype.newPipes = function(){
	// for(var i=0; i<pipes.length; i++){
	// 	var pipe = pipes[i];
	// 	window.setInterval(this.entities.push(i), 2000);
	// 	// this.createPipes();
	// }
	this.entities.push(new pipe.Pipe(2,0.75));
	this.entities.push(new pipe.Pipe(2.3,-0.75));
};

GraphicsSystem.prototype.createPipes = function(){
	// var newPipes = function(){
	// 	this.entities.push(pipeTop);
	// }
	window.setInterval(this.newPipes.bind(this), 2000);
	for(var i=0; i<this.entities.length; i++){
		var entity = this.entities[i];
		if (!"graphics" in entity.components){
			continue;
		}

		entity.components.graphics.draw(this.context);
	}
};

exports.GraphicsSystem = GraphicsSystem;








},{"../entities/pipe":5}],9:[function(require,module,exports){
var InputSystem = function(entities) {
	this.entities = entities;

	//Canvas is where we get input from
	this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function(){
	// On mobile, leaving both of these active creates a doubling-effect on touch. 
	this.canvas.addEventListener('click', this.onClick.bind(this));
	this.canvas.addEventListener('touchstart', this.onClick.bind(this), false);
};

InputSystem.prototype.onClick = function(e){
	e.preventDefault();
	var bird = this.entities[0];
	bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;
},{}],10:[function(require,module,exports){
var PhysicsSystem = function(entities){
	this.entities = entities;
};

PhysicsSystem.prototype.run = function(){
	// Run the update loop
	window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function(){
	for(var i=0; i<this.entities.length; i++){
		var entity = this.entities[i];
		if (!"physics" in entity.components){
			continue;
		}

		entity.components.physics.update(1/60);
	}
};

exports.PhysicsSystem = PhysicsSystem;
},{}]},{},[7]);
