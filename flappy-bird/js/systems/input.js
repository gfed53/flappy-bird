// Systems
var graphicsSystem = require("./graphics");
var physicsSystem = require("./physics");

var InputSystem = function(entities) {
	this.entities = entities;
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.html = document.querySelector('html');
	//Canvas is where we get input from
	this.canvas = document.getElementById('main-canvas');
	this.paused = false;
};

//On click(or touch, if mobile) the bird entity's acceleration will increase vertically (a 'hopping' motion)
InputSystem.prototype.run = function(){
	// On mobile, leaving both of these active creates a doubling-effect on touch. 
	this.canvas.addEventListener('click', this.onClick.bind(this));
	this.canvas.addEventListener('touchstart', this.onClick.bind(this), false);
	// this.html.addEventListener('keydown', this.onKeyDown.bind(this), false);
	//Why doesn't below work?
	// this.html.addEventListener('keydown', function(e){
	// 	if(e.keyCode === 32) {
	// 		console.log(this);
	// 		this.onSpace.bind(this);
	// 	}
	// });
};

InputSystem.prototype.onClick = function(e){
	e.preventDefault();
	var bird = this.entities[0];
	if(bird.components.count > 5){
		bird.components.physics.velocity.y = 0.7;
	}
};

// InputSystem.prototype.onKeyDown = function(){
// 	if(this.paused === false){
// 		console.log("pause");
// 		//These are a new instance of "count". That's the problem?
// 		this.graphics.count = 0;
// 		this.physics.count = 0;
// 		this.entities[0].components.physics.acceleration.y = 0;
// 		this.entities[0].components.physics.velocity.y = 0;
// 		console.log(this.graphics.count);
// 		for(var i=3; i<this.entities.length; i++){
// 			var entity = this.entities[i];
// 			console.log(entity);
// 			entity.components.physics.acceleration.y = 0;
// 			entity.components.physics.velocity.y = 0;
// 		}

// 		this.paused = true;
// 	} else {
// 		this.paused = false;
// 		console.log("unpaused");
// 		for(var i=3; i<this.entities.length; i++){
// 			var entity = this.entities[i];
// 			console.log(entity);
// 			entity.components.physics.acceleration.y = -0.01;
// 			entity.components.physics.velocity.y = -0.02;
// 		}
// 		// this.entities[0].components.physics.acceleration.y = -2;
// 	}
// 	// e.preventDefault();
// 	// window.clearInterval(this.physics.run.bind(this));
	
// 	console.log(this.entities[0]);
// };



exports.InputSystem = InputSystem;