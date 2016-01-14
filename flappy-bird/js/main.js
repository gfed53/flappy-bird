//On page load...
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flappyBird.FlappyBird();
	app.run();

	//Local Storage
	var highScoreElem = $("#high-score");
	var highScoreVal = $("#high-score").text();

	var populateStorage = function(){
		localStorage.setItem('high-score', highScoreElem.text());
		var currentHighScore = localStorage.getItem('high-score');
		// console.log(currentHighScore);
		// setHighScore();
	};

	var setHighScore = function() {
		var currentHighScore = localStorage.getItem('high-score');
		// console.log(currentHighScore);
		highScoreElem.text(currentHighScore);
	};

	$(document).on('click', function(){
		populateStorage();
	});

	setHighScore();

	// window.setInterval(populateStorage(), 500);

	// $("span").on('change', function(){
	// 	populateStorage();
	// });

	// highScoreVal.onchange = populateStorage();
});





// $(this).on('keydown', function(event) {
// 		if (event.keyCode === 88) {
// 			$('.ryu div').hide();
// 			$('.ryu-cool').show();
// 		}
// 	});