var pipe = require("../entities/pipe");

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
	this.entities.push(new pipe.Pipe(1,0.75));
	this.entities.push(new pipe.Pipe(1,-0.75));
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







