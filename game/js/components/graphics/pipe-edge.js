var PipeEdgeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeEdgeGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.lineTo(position.x, 1);
	context.stroke();
	context.restore();
};

exports.PipeEdgeGraphicsComponent = PipeEdgeGraphicsComponent;