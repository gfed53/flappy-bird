//On page load...
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flappyBird.FlappyBird();
	app.run();
});

// $(this).on('keydown', function(event) {
// 		if (event.keyCode === 88) {
// 			$('.ryu div').hide();
// 			$('.ryu-cool').show();
// 		}
// 	});