var BirdGraphicsComponent = function(entity) {
	this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position,
	image = document.getElementById("hado");

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	// context.arc(0, 0, 0.02, 0, 2 * Math.PI);
	context.drawImage(image, 0, 0, 0.1, 0.1);
	context.fill();
	context.closePath();
	context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;