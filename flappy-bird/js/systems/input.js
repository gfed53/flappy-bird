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
	// this.canvas.addEventListener('click', this.onClick.bind(this));

	// On mobile, leaving both of these active creates a doubling-effect on touch. 
	this.canvas.addEventListener('click', this.onClick.bind(this));

	this.canvas.addEventListener('touchstart', this.onClick.bind(this), false);
};

InputSystem.prototype.onClick = function(e){
	e.preventDefault();
	var bird = this.entities[0];
	if(bird.components.count > 5){
		bird.components.physics.velocity.y = 0.7;
	}
};

exports.InputSystem = InputSystem;