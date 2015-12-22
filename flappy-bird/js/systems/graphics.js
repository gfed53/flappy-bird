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
	// 	window.setTimeout(this.entities.push(pipe), 2000);
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

GraphicsSystem.prototype.createPipes = function(){
	// for(var i=0; i<pipes.length; i++){
		// var pipe = pipes[i];
		// this.newPipes(pipes);

		// Uncomment this below for the basic formula..
		window.setInterval(this.newPipes.bind(this), 2000);
		window.setInterval(this.drawPipes.bind(this), 2000);
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
		// console.log(this.entities);
		console.log("draw");
	}
};



exports.GraphicsSystem = GraphicsSystem;







