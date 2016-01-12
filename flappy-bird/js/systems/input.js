var InputSystem = function(entities) {
	this.entities = entities;

	//Canvas is where we get input from
	this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function(){
<<<<<<< HEAD
	// this.canvas.addEventListener('click', this.onClick.bind(this));
=======
	// On mobile, leaving both of these active creates a doubling-effect on touch. 
	this.canvas.addEventListener('click', this.onClick.bind(this));
>>>>>>> master
	this.canvas.addEventListener('touchstart', this.onClick.bind(this), false);
};

InputSystem.prototype.onClick = function(e){
	e.preventDefault();
	var bird = this.entities[0];
	bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;