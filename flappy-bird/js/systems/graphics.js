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
	// this.count = 0;

};

GraphicsSystem.prototype.run = function(){
	// Run the render loop
	window.requestAnimationFrame(this.tick.bind(this));
	this.createPipes();
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

//Counter
GraphicsSystem.prototype.counter = function(){
	if(this.entities[0].components.status === "pause"){
		this.count = 0;
		console.log("graphics are paused");
	} else{
		this.count+=1;
	}
	console.log("graphics: "+this.count);
}

GraphicsSystem.prototype.countDown = function(){
	window.setInterval(this.counter.bind(this), 1000);
	// console.log("graphics ID: "+window.setInterval(this.counter.bind(this), 1000));
}

GraphicsSystem.prototype.stopCount = function(){
	window.clearInterval(8);
}

GraphicsSystem.prototype.runClear = function(){
	window.setInterval(this.clearAll.bind(this), 1);
}

GraphicsSystem.prototype.clearAll = function(){
	if(this.entities[0].components.pipes === "stopped"){
		console.log("should be clear");
		this.entities.splice(3,9);
		//Clear the counter, bird "collision" status
		// this.count = 0;
		//To change to--->
		this.entities[0].components.count = 0;
		// console.log(this);
		// window.clearInterval(this.countDown);
		this.entities[0].components.pipes = "in motion";
	}
	// console.log(this.entities[0]);
}

GraphicsSystem.prototype.newPipes = function(){
	//Changed..
	if(this.entities[0].components.count>8){
		var randomHeight = Math.floor((Math.random() * pipeHeightsArray.length));
		this.entities.push(new pipe.Pipe(2, pipeHeightsArray[randomHeight]));
		this.entities.push(new pipeEdge.PipeEdge(2));
		if(this.entities.length>10){
			this.entities.splice(3, 2);
		}
	}
};

GraphicsSystem.prototype.createPipes = function(){
	window.setInterval(this.newPipes.bind(this), 2000);
	window.setInterval(this.drawPipes.bind(this), 2000);
	// console.log(window.setInterval(this.newPipes.bind(this), 2000));
	// console.log(window.setInterval(this.drawPipes.bind(this), 2000));
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







