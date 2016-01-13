var InputSystem = function(entities) {
	this.entities = entities;

	//Canvas is where we get input from
	this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function(){
	// this.canvas.addEventListener('click', this.onClick.bind(this));

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