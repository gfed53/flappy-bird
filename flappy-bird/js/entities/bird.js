var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
// var score = require("../systems/score");
//What is 'settings'?
// var settings = require("../settings");

var Bird = function(){
	// console.log("Creating bird entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = 0;

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
	//What exactly does this do? 
	collision.onCollision = this.onCollision.bind(this);
	var status = "none";
	var pipes = "in motion";
	var paused = false;
	var count = 0;

	this.components= {
		physics: physics,
		graphics: graphics,
		collision: collision,
		status: status,
		pipes: pipes,
		paused: paused,
		count: count
	};
};

Bird.prototype.onCollision = function(entity) {
	// console.log("Bird collided with entity:", entity);
	// console.log(entity.components.collision.type);
	// var scoreText = $("#pipes-flown-through").text(),
	// scoreNumb = parseFloat(score),
	// highScore = $("#high-score").text(),
	// highScoreNumb = parseInt(highScore);

	//New way using Score object:
	// var scoreText = $("#pipes-flown-through").text(),
	// scoreNumb = parseFloat(scoreText);
	// score = new score.Score(scoreNumb);
	// console.log(score);

	if(entity.components.collision.type === "pipe-edge"){
		console.log("Increase score by 1");
		// console.log(scoreInt);
		// scoreNumb+=0.5;
		// console.log(scoreInt);
		// scoreText = String(scoreNumb);
		// $("#pipes-flown-through").text(scoreText);
		this.components.status = "point";
	} else {
		// console.log("Should reset");
		this.components.physics.position.x = 0;
		this.components.physics.position.y = 0.5;
		this.components.physics.velocity.y = 0;
		this.components.status = "collide";
		this.components.pipes = "stopped";

		// if(scoreNumb>highScoreNumb){
		// 	$("#high-score").text(scoreText);
		// }

		//New Way:


		// $("#pipes-flown-through").text("0");
	}
};

//Maybe make a counter components on this entity instead of seperate ones?
//Counter
Bird.prototype.counter = function(){
	if(this.components.paused === true){
		this.components.count = 0;
		console.log("paused");
	} else{
		this.components.count+=0.1;
	}
	console.log(this.components.count);
}

Bird.prototype.countDown = function(){
	window.setInterval(this.counter.bind(this), 100);
	// console.log("graphics ID: "+window.setInterval(this.counter.bind(this), 1000));
}



exports.Bird = Bird;