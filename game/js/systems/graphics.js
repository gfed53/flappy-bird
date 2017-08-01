var pipe = require("../entities/pipe"),
pipeEdge = require("../entities/pipe-edge"),
bird = require("../entities/bird"),
pipeHeightsArray = [0.9, 0.75, 0.5, 0.25, -0.25, -0.75];

var GraphicsSystem = function(entities) {
	this.entities = entities;
	// Canvas is where we draw
	this.canvas = document.getElementById("main-canvas");
	// Context is what we draw to
	this.context = this.canvas.getContext("2d");
};

GraphicsSystem.prototype.run = function(){
	// Run the render loop
	window.requestAnimationFrame(this.tick.bind(this));
	this.createPipes();
};

GraphicsSystem.prototype.tick = function() {
	console.log("graphics tick");
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
};

GraphicsSystem.prototype.clearAll = function(){
	if(this.entities[0].components.pipes === "stopped"){
		this.entities.splice(3,18);
		this.entities[0].components.count = 0;
		this.entities[0].components.pipes = "in motion";
	}
};

GraphicsSystem.prototype.newPipes = function(){
	if(this.entities[0].components.count>5){
		var randomHeight = Math.floor((Math.random() * pipeHeightsArray.length));
		this.entities.push(new pipe.Pipe(2, pipeHeightsArray[randomHeight]));
		this.entities.push(new pipeEdge.PipeEdge(2));
		if(this.entities.length>20){
			this.entities.splice(3, 2);
		}
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
	}
};

exports.GraphicsSystem = GraphicsSystem;







