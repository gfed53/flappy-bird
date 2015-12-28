(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius){
	this.entity = entity;
	this.radius = radius;
	this.type = "circle";
};

CircleCollisionComponent.prototype.collidesWith = function(entity){
	if(entity.components.collision.type === "circle"){
		return this.collideCircle(entity);
	}
	else if(entity.components.collision.type === "rect"){
		return this.collideRect(entity);
	}
	return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity){
	var positionA = this.entity.components.physics.position;
	var positionB = entity.components.physics.position;

	var radiusA = this.radius;
	var radiusB = entity.components.collision.radius;

	var diff = {
		x: positionA.x - positionB.x,
		y: positionA.y - positionB.y
	};

	var distanceSquared = diff.x * diff.x + diff.y * diff.y;
	var radiusSum = radiusA + radiusB;

	return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity){
	var clamp = function(value, low, high) {
		if (value < low) {
			return low;
		}
		if (value > high) {
			return high;
		}
		return value;
	};

	var positionA = this.entity.components.physics.position;
	var positionB = entity.components.physics.position;
	var sizeB = entity.components.collision.size;

	var closest = {
		x: clamp(positionA.x, positionB.x - sizeB.x / 2, positionB.x + sizeB.x / 2),
		y: clamp(positionA.y, positionB.y - sizeB.y / 2, positionB.y + sizeB.y / 2)
	};

	var radiusA = this.radius;

	var diff = {
		x: positionA.x - closest.x,
		y: positionA.y - closest.y
	};

	var distanceSquared = diff.x * diff.x + diff.y * diff.y;
	return distanceSquared > radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;











},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size){
	this.entity = entity;
	this.size = size;
	this.type = "rect";
};

RectCollisionComponent.prototype.collidesWith = function(entity){
	if (entity.components.collision.type === "circle") {
		return this.collideCircle(entity);
	} else if(entity.components.collision.type === "rect") {
		return this.collideRect(entity);
	}
	return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
	return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
	var positionA = this.entity.components.physics.position;
	var positionB = entity.components.physics.position;

	var sizeA = this.size;
	var sizeB = entity.components.collision.size;

	var leftA = positionA.x - sizeA.x / 2;
	var rightA = positionA.x + sizeA.x / 2;
	var bottomA = positionA.y - sizeA.y / 2;
	var topA = positionA.y + sizeA.y / 2;

	var leftB = positionB.x - sizeB.x / 2;
    var rightB = positionB.x + sizeB.x / 2;
    var bottomB = positionB.y - sizeB.y / 2;
    var topB = positionB.y + sizeB.y / 2;

    //This doesn't make sense. All would have to be false for a collision to occur, not at least one.
    return !(leftA > rightB || leftB > rightA || bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;


},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
// var settings = require("../settings");

var Bird = function(){
	console.log("Creating bird entity");

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = -2;

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	//This doesn't seem to make sense. Could this be the problem? 
	collision.onCollision = this.onCollision.bind(this);

	this.components= {
		physics: physics,
		graphics: graphics,
		collision: collision
	};
};

Bird.prototype.onCollision = function(entity) {
	console.log("Bird collided with entity:", entity);
};

exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":5}],7:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
// var settings = require("../settings");

var Pipe = function(x,y){
	console.log("Creating pipe entity");

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = y;
	physics.velocity.x = -0.1;
	physics.acceleration.x = -0.15;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);

	var collision = new collisionComponent.RectCollisionComponent(this, {x: 0.25, y: 1});
	collision.onCollision = this.onCollision.bind(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

Pipe.prototype.onCollision = function(entity) {
	// console.log("Pipe collided with entity:", entity);
};

// var pipeTop = new Pipe(1,0.75)
// 	pipeBottom = new Pipe(1,-0.75);

// var pipes = [pipeTop, pipeBottom];

exports.Pipe = Pipe;
// exports.pipes = pipes;
// exports.pipeBottom = pipeBottom;
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":5}],8:[function(require,module,exports){
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
	this.graphics.createPipes();
	this.physics.run();
	this.input.run();

};

exports.FlappyBird = FlappyBird;

},{"./entities/bird":6,"./entities/pipe":7,"./systems/graphics":11,"./systems/input":12,"./systems/physics":13}],9:[function(require,module,exports){
//On page load...
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flappyBird.FlappyBird();
	app.run();
});
},{"./flappy_bird":8}],10:[function(require,module,exports){
var CollisionSystem = function(entities) {
	this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
	for(var i=0; i<this.entities.length; i++) {
		var entityA = this.entities[i];
		if (!"collision" in entityA.components){
			continue;
		}

		for(var j=i+1; j<this.entities.length; j++){
			var entityB = this.entities[j];
			if(!"collision" in entityB.components){
				continue;
			}

			//collidesWith() is not actually running?? onCollision() is just running at every tick because there're no conditions being noticed!!
			if(!entityA.components.collision.collidesWith(entityB)){
				continue;
			}
			//Shouldn't it be entityA.onCollision?
			if(entityA.components.collision.onCollision) {
				entityA.components.collision.onCollision(entityB);
			}

			if(entityB.components.collision.onCollision) {
				entityB.components.collision.onCollision(entityA);
			}
		}
	}
};

exports.CollisionSystem = CollisionSystem;
},{}],11:[function(require,module,exports){
var pipe = require("../entities/pipe"),
	pipeTop = new pipe.Pipe(1,0.75),
	pipeBottom = new pipe.Pipe(1,-0.75),
	pipes = [pipeTop, pipeBottom];

console.log(pipeTop);
console.log(new pipe.Pipe(1,0.75));
console.log(pipes[0]);
// var pipes = pipe.pipes;
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
	// var pushPipe = function(pipe){
	// 	this.entities.push(pipe);
	// }
	// var count = 1;
	// var myLoop = function(){
	// 	setTimeout(function(){
	// 		pushPipe;
	// 		count++;
	// 		if (i<pipes.length){
	// 			myLoop();
	// 		}
	// 	}, 2000);
	// }

	// for(var i=0; i<pipes.length; i++){
	// 	var pipe = pipes[i];
	// 	setTimeout(function(){
	// 		this.entities.push(pipe);

	// 		, 2000);
	// 	console.log(this.entities);

	// 	this.drawPipes()

		// window.setInterval(this.drawPipes.bind(this), 2000);
	// // 	// this.createPipes();
	// }
	// this.entities.push(pipe);

	//Uncomment this below for the basic formula..
	this.entities.push(new pipe.Pipe(2,0.75));
	this.entities.push(new pipe.Pipe(2.3,-0.75));
};

// GraphicsSystem.prototype.newPipes2 = function(){
// 	setInterval(
// 		for(var i=0; i<pipes.length; i++){
// 			setTimeout(

// 				)
// 			}
// 		);
// }

GraphicsSystem.prototype.createPipe3 = function(){
	this.entities.push(pipes[0]);
	console.log("created pipe 3");
};

GraphicsSystem.prototype.createPipe4 = function(){
	this.entities.push(pipes[1]);
	console.log("created pipe 4");
};

GraphicsSystem.prototype.createPipes = function(){
	// for(var i=0; i<pipes.length; i++){
		// var pipe = pipes[i];
		// this.newPipes(pipes);

		// window.setInterval(this.createPipe3.bind(this), 2000);
		// window.setInterval(this.createPipe4.bind(this), 4000);
		// window.setInterval(this.tick.bind(this), 2000);
		// Uncomment this below for the basic formula..
		this.newPipes();
		this.drawPipes();
		// window.setInterval(this.newPipes.bind(this), 2000);
		// window.setInterval(this.drawPipes.bind(this), 2000);


	// }
};

GraphicsSystem.prototype.drawPipes = function(){
	// window.setInterval(this.newPipes.bind(this), 2000);
	for(var i=0; i<this.entities.length; i++){
		var entity = this.entities[i];
		if (!"graphics" in entity.components){
			continue;
		}

		entity.components.graphics.draw(this.context);
		console.log(this.entities);
		console.log("draw");
	}
};



exports.GraphicsSystem = GraphicsSystem;

//Possible solution
// for(let i=0; i<100; i++){
	// 	var pipe = pipes[random number between 0 and pipes.length(Math.rand..)];
	// 	setTimeout(function(){
	// 		this.entities.push(pipe);
	// 		, (i+1)*1000);
	// 	console.log(this.entities);






},{"../entities/pipe":7}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
var collisionSystem = require("./collision");

var PhysicsSystem = function(entities){
	this.entities = entities;
	this.collisionSystem = new collisionSystem.CollisionSystem(entities);
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

	this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":10}]},{},[9]);
