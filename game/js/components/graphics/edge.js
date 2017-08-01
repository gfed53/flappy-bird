var EdgeGraphicsComponent = function(entity) {
	this.entity = entity;
};

EdgeGraphicsComponent.prototype.draw = function(context){
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.lineTo(1, position.y);
	context.stroke();
	context.restore();
};

exports.EdgeGraphicsComponent = EdgeGraphicsComponent;