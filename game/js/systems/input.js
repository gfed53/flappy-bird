// Systems
var graphicsSystem = require("./graphics");
var physicsSystem = require("./physics");

var InputSystem = function(entities) {
	this.entities = entities;
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.html = document.querySelector("html");
	//Canvas is where we get input from
	this.canvas = document.getElementById("main-canvas");
	this.pauseButton = document.getElementById("btn-pause");
	this.paused = false;
};

//On click(or touch, if mobile) the bird entity"s acceleration will increase vertically (a "hopping" motion)
InputSystem.prototype.run = function(){
	// On mobile, leaving both of these active creates a doubling-effect on touch. 
	this.canvas.addEventListener("click", this.onClick.bind(this));
	this.canvas.addEventListener("touchstart", this.onClick.bind(this), false);
	this.pauseButton.addEventListener("click", this.pauseGame.bind(this), false);
	this.html.addEventListener("keydown", this.onShift.bind(this), false);
};

InputSystem.prototype.onClick = function(e){
	e.preventDefault();
	var bird = this.entities[0];
	if(bird.components.count > 5){
		bird.components.physics.velocity.y = 0.7;
	}
};

InputSystem.prototype.onShift = function(e){
	if(e.keyCode === 32){
		this.pauseGame();
	}
}

InputSystem.prototype.pauseGame = function(){
	if(this.entities[0].components.paused === false){
		this.entities[0].components.paused = true;
		this.entities[0].components.physics.acceleration.y = 0;
		this.entities[0].components.physics.velocity.y = 0;
	} else {
		this.entities[0].components.paused = false;
	}
}

exports.InputSystem = InputSystem;