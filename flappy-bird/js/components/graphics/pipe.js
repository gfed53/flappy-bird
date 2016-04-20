var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position,
	image = document.getElementById("wood");

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.drawImage(image, 0, 0, 0.25, 1);
	context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;