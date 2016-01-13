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
		return this.collideRect2(entity);
	}
    else if(entity.components.collision.type === "edge"){
        return this.collideEdge(entity);
    }
    else if(entity.components.collision.type === "pipe-edge"){
        return this.collidePipeEdge(entity);
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

CircleCollisionComponent.prototype.collideRect = function(entity) {
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
    // console.log(positionA);
    // console.log(positionB);
    // console.log(sizeB);
    var closest = {
        x: clamp(positionA.x, positionB.x - sizeB.x / 2,
                 positionB.x + sizeB.x / 2),
        y: clamp(positionA.y, positionB.y - sizeB.y / 2,
                 positionB.y + sizeB.y / 2)
    };
    // if (positionB.x === 0) {
    //     if(positionA.y >= positionB.y){
    //         console.log("collide");
    //     }
    //     else{
    //         console.log("no collision");
    //     }
    // } else {
    //     console.log("not on edge yet");
    // }

    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;

    return distanceSquared < radiusA * radiusA;
};

CircleCollisionComponent.prototype.collideRect2 = function(entity) {
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
    // console.log(positionA);
    // console.log(positionB);
    // console.log(sizeB);
    var closest = {
        x: clamp(positionA.x, positionB.x,
                 positionB.x + sizeB.x),
        y: clamp(positionA.y, positionB.y,
                 positionB.y + sizeB.y)
    };

    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;

    return distanceSquared < radiusA * radiusA;
};

CircleCollisionComponent.prototype.collideEdge = function(entity){
    var positionA = this.entity.components.physics.position.y;
    var positionB = entity.components.physics.position.y;

    if(positionB === 1){
        return positionA > positionB;
    } else if(positionB === 0){
        return positionA < positionB;
    }
}

CircleCollisionComponent.prototype.collidePipeEdge = function(entity){
    // var positionA = this.entity.components.physics.position.x;
    var positionB = entity.components.physics.position.x;
    // console.log(positionA+" a");
    // console.log(positionB+" b");

    return positionB < 0.01 && positionB > -0.01;
}

exports.CircleCollisionComponent = CircleCollisionComponent;











},{}],2:[function(require,module,exports){
var EdgeCollisionComponent = function(entity){
	this.entity = entity;
	this.type = "edge";
}

EdgeCollisionComponent.prototype.collidesWith = function(entity){
	if (entity.components.collision.type === "circle") {
		return this.collideCircle(entity);
	} 
	return false;
};

EdgeCollisionComponent.prototype.collideCircle = function(entity){
	return entity.components.collision.collideEdge(this.entity);
}

exports.EdgeCollisionComponent = EdgeCollisionComponent;
},{}],3:[function(require,module,exports){
var PipeEdgeCollisionComponent = function(entity){
	this.entity = entity;
	this.type = "pipe-edge";
}

PipeEdgeCollisionComponent.prototype.collidesWith = function(entity){
	if (entity.components.collision.type === "circle") {
		return this.collideCircle(entity);
	} 
	return false;
};

PipeEdgeCollisionComponent.prototype.collideCircle = function(entity){
	return entity.components.collision.collidePipeEdge(this.entity);
}

exports.PipeEdgeCollisionComponent = PipeEdgeCollisionComponent;
},{}],4:[function(require,module,exports){
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

    
    return !(leftA > rightB || leftB > rightA || bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;


},{}],5:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
	this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position,
	image = document.getElementById("hado");

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	// context.arc(0, 0, 0.02, 0, 2 * Math.PI);
	context.drawImage(image, 0, 0, 0.1, 0.1);
	context.fill();
	context.closePath();
	context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],6:[function(require,module,exports){
var EdgeGraphicsComponent = function(entity) {
	this.entity = entity;
};

EdgeGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.lineTo(1, position.y);
	context.stroke();
	context.restore();
};

exports.EdgeGraphicsComponent = EdgeGraphicsComponent;
},{}],7:[function(require,module,exports){
var PipeEdgeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeEdgeGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.lineTo(position.x, 1);
	context.stroke();
	context.restore();
};

exports.PipeEdgeGraphicsComponent = PipeEdgeGraphicsComponent;
},{}],8:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.fillRect(0, 0, 0.25, 1);
	context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
//What is 'settings'?
// var settings = require("../settings");

var Bird = function(){
	console.log("Creating bird entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = -2;

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	//What exactly does this do? 
	collision.onCollision = this.onCollision.bind(this);
	var status = 0;

	this.components= {
		physics: physics,
		graphics: graphics,
		collision: collision,
		status: status
	};
};

Bird.prototype.onCollision = function(entity) {
	console.log("Bird collided with entity:", entity);
	console.log(entity.components.collision.type);
	var score = $("#pipes-flown-through").text(),
	scoreNumb = parseFloat(score),
	highScore = $("#high-score").text(),
	highScoreNumb = parseInt(highScore);



	if(entity.components.collision.type === "pipe-edge"/*|| entity.components.collision.type === "edge"*/){
		console.log("Increase score by 1");
		// console.log(scoreInt);
		scoreNumb+=0.5;
		// console.log(scoreInt);
		score = String(scoreNumb);
		$("#pipes-flown-through").text(score);
	} else {
		console.log("Should reset");
		this.components.physics.position.x = 0;
		this.components.physics.position.y = 0.5;
		this.components.physics.velocity.y = 0;
		this.components.status = 1;

		if(scoreNumb>highScoreNumb){
			$("#high-score").text(score);
		}
		$("#pipes-flown-through").text("0");
	}
	
	
	
};

exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":5,"../components/physics/physics":9}],11:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/edge");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/edge");

var BottomEdge = function(){
	console.log("Creating bottom edge entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0;

	var graphics = new graphicsComponent.EdgeGraphicsComponent(this);
	var collision = new collisionComponent.EdgeCollisionComponent(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

exports.BottomEdge = BottomEdge;
},{"../components/collision/edge":2,"../components/graphics/edge":6,"../components/physics/physics":9}],12:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe-edge");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/pipe-edge");
// var settings = require("../settings");

var PipeEdge = function(x){
	console.log("Creating pipe-edge entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = 0;
	physics.velocity.x = -0.2;
	physics.acceleration.x = -0.1;

	var graphics = new graphicsComponent.PipeEdgeGraphicsComponent(this);

	var collision = new collisionComponent.PipeEdgeCollisionComponent(this);
	// collision.onCollision = this.onCollision.bind(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

// PipeEdge.prototype.onCollision = function(entity) {
// 	// console.log("Pipe collided with entity:", entity);
// 	// console.log(this.components.physics.position.x + ", "+this.components.physics.position.y);
// };

exports.PipeEdge = PipeEdge;
},{"../components/collision/pipe-edge":3,"../components/graphics/pipe-edge":7,"../components/physics/physics":9}],13:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
// var settings = require("../settings");

var Pipe = function(x,y){
	console.log("Creating pipe entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = x;
	physics.position.y = y;
	physics.velocity.x = -0.2;
	physics.acceleration.x = -0.1;

	this.components = {
		physics: physics
	};

	var rectHeightValue = function(y){
		if(y>0){
			return 1-y;
		} else{
			return 1;
		}
	};

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);

	var collision = new collisionComponent.RectCollisionComponent(this, {x: 0.25, y: rectHeightValue(this.components.physics.position.y)});
	collision.onCollision = this.onCollision.bind(this);


	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};

	console.log(this.components.physics.position.y);
};

Pipe.prototype.onCollision = function(entity) {
	// console.log("Pipe collided with entity:", entity);
	// console.log(this.components.physics.position.x + ", "+this.components.physics.position.y);
};

exports.Pipe = Pipe;
},{"../components/collision/rect":4,"../components/graphics/pipe":8,"../components/physics/physics":9}],14:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/edge");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/edge");

var TopEdge = function(){
	console.log("Creating top edge entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 1;

	var graphics = new graphicsComponent.EdgeGraphicsComponent(this);
	var collision = new collisionComponent.EdgeCollisionComponent(this);

	this.components= {
		graphics: graphics,
		physics: physics,
		collision: collision
	};
};

exports.TopEdge = TopEdge;
},{"../components/collision/edge":2,"../components/graphics/edge":6,"../components/physics/physics":9}],15:[function(require,module,exports){
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
var pipeEdge = require("./entities/pipe-edge");

var FlappyBird = function(){
	this.entities = [new bird.Bird(), new topEdge.TopEdge(), new bottomEdge.BottomEdge()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
	this.collision = new collisionSystem.CollisionSystem(this.entities);
};

FlappyBird.prototype.run = function(){
	this.physics.run();
	this.graphics.run();
	this.graphics.createPipes();
	this.graphics.runClear();
	this.input.run();
	console.log(this.entities[0].components.status);
};

FlappyBird.prototype.pause = function(){
	window.clearInterval(this.physics.run.bind(this));
	console.log("pause");
}

exports.FlappyBird = FlappyBird;

},{"./entities/bird":10,"./entities/bottom-edge":11,"./entities/pipe":13,"./entities/pipe-edge":12,"./entities/top-edge":14,"./systems/collision":17,"./systems/graphics":18,"./systems/input":19,"./systems/physics":20}],16:[function(require,module,exports){
//On page load...
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flappyBird.FlappyBird();
	app.run();
});

// $(this).on('keydown', function(event) {
// 		if (event.keyCode === 88) {
// 			$('.ryu div').hide();
// 			$('.ryu-cool').show();
// 		}
// 	});
},{"./flappy_bird":15}],17:[function(require,module,exports){
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

			if(!entityA.components.collision.collidesWith(entityB)){
				continue;
			}

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
},{}],18:[function(require,module,exports){
var pipe = require("../entities/pipe"),
pipeEdge = require("../entities/pipe-edge"),
bird = require("../entities/bird"),
pipeHeightsArray = [0.9, 0.75, 0.5, 0.25, -0.25, -0.75];

var GraphicsSystem = function(entities) {
	this.entities = entities;
	// Canvas is where we draw
	this.canvas = document.getElementById('main-canvas');
	// Context is what we draw to
	this.context = this.canvas.getContext('2d');

};

GraphicsSystem.prototype.run = function(){
	// Run the render loop
	window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
	// Set the canvas to the correct size if the window is resized
	if (this.canvas.width != this.canvas.offsetWidth ||
		this.canvas.height != this.canvas.offsetHeight) {
		this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
}

	// Clear the canvas
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	var background = document.getElementById("ryu-stage");
	this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);

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

GraphicsSystem.prototype.runClear = function(){
	window.setInterval(this.clearAll.bind(this), 1);
}

GraphicsSystem.prototype.clearAll = function(){
	if(this.entities[0].components.status === 1){
		console.log("should be clear");
		this.entities.splice(3,9);
		this.entities[0].components.status = 0;
	}
	// console.log(this.entities[0]);
}

GraphicsSystem.prototype.newPipes = function(){
	var randomHeight = Math.floor((Math.random() * pipeHeightsArray.length));
	this.entities.push(new pipe.Pipe(2, pipeHeightsArray[randomHeight]));
	this.entities.push(new pipeEdge.PipeEdge(2));
	if(this.entities.length>10){
		this.entities.splice(3, 2);
	}
};

GraphicsSystem.prototype.createPipes = function(){
	window.setInterval(this.newPipes.bind(this), 2000);
	window.setInterval(this.drawPipes.bind(this), 2000);
};

GraphicsSystem.prototype.drawPipes = function(){
	for(var i=0; i<this.entities.length; i++){
		var entity = this.entities[i];
		if (!"graphics" in entity.components){
			continue;
		}

		entity.components.graphics.draw(this.context);
		// console.log(this.entities);
	}
};



exports.GraphicsSystem = GraphicsSystem;








},{"../entities/bird":10,"../entities/pipe":13,"../entities/pipe-edge":12}],19:[function(require,module,exports){
var InputSystem = function(entities) {
	this.entities = entities;

	//Canvas is where we get input from
	this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function(){
	// On mobile, leaving both of these active creates a doubling-effect on touch. 
	this.canvas.addEventListener('click', this.onClick.bind(this));
	this.canvas.addEventListener('touchstart', this.onClick.bind(this), false);
	// this.addEventListener('keydown', function(e){
	// 	if(e.keyCode === 32) {
	// 		this.onSpace.bind(this);
	// 	}
	// });
};

InputSystem.prototype.onClick = function(e){
	e.preventDefault();
	var bird = this.entities[0];
	bird.components.physics.velocity.y = 0.7;
};

InputSystem.prototype.onSpace = function(e){
	e.preventDefault();
	window.clearInterval(this.physics.run.bind(this));
	console.log("pause");
};



exports.InputSystem = InputSystem;
},{}],20:[function(require,module,exports){
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
},{"./collision":17}]},{},[16]);
