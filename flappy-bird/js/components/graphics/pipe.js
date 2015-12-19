var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.fillRect(0, 0, 0.25, 1);
	// console.log("Drawing a pipe.");
	context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;