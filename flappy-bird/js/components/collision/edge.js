var EdgeCollisionComponent = function(entity){
	this.entity = entity;
	this.type = "edge";
}

EdgeCollisionComponent.prototype.collidesWith = function(entity){
	if (entity.components.collision.type === "circle") {
		return this.collideCircle(entity);
	} 
	return false;
};

EdgeCollisionComponent.prototype.collideCircle = function(entity){
	return entity.components.collision.collideEdge(this.entity);
}

exports.EdgeCollisionComponent = EdgeCollisionComponent;