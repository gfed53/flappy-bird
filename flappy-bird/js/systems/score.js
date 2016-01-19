// Local Storage High Score Object
var Score = function(entities){
	this.entities = entities;
	//Our current score
	this.current = parseFloat($("#pipes-flown-through").text());
	this.highScore = 0;	
};

// Score.prototype.run = function(){
// 	this.update();
// }

//Checks to see if we have a high-score key in localStorage. If not, we return 0. If we do, we return it.
Score.prototype.get = function(){
	console.log(this.current);
	if(localStorage.getItem('high-score')){
		this.highScore = localStorage.getItem('high-score');
		this.highScore = parseInt(this.highScore);
		console.log(this.highScore);
	} else {
		console.log("nothing");
	}
};

//Checks to see if our current score is greater than our high score. If so, we return it.
Score.prototype.high = function(){
	if(this.current>this.highScore){
		this.highScore = this.current;
	}
};

//Checks to see if current HIGH score is greater than our locally-stored high score, and if so, sets the new high score.
Score.prototype.set = function(){
	// if(this.high()>this.get()){
		localStorage.setItem('high-score', this.highScore);
	// }
};

Score.prototype.update = function(){
	if(this.entities[0].components.status === "point"){
		console.log("scored point");
		this.current+=1;
		this.entities[0].components.status = "none";
	} else if(this.entities[0].components.status === "collide"){
		this.high();
		this.current = 0;
		console.log("crashed");
		//We do not reset the status to "none" because the physics reset method still relies on this status to work.
		// this.entities[0].components.status = "none";
	}
	//Regardless, we will both set the inner HTML of the current score and high score at each update.
	scoreText = String(this.current);
	$("#pipes-flown-through").text(scoreText);
	highScoreText = String(this.highScore);
	// console.log(highScoreText);
	$("#high-score").text(highScoreText);
	this.set();
};

Score.prototype.clearLocalHigh = function(){
	localStorage.setItem('high-score', 0);
	console.log(this.highScore);
}

exports.Score = Score;