var PipeEdgeCollisionComponent = function(){
	this.type = "pipe-edge";
}

PipeEdgeCollisionComponent.prototype.collidesWith = function(entity){
	if (entity.components.collision.type === "circle") {
		return this.collideCircle(entity);
	} 
	return false;
};

PipeEdgeCollisionComponent.prototype.collideCircle = function(entity){
	return entity.components.collision.collidePipeEdge(this.entity);
}

exports.PipeEdgeCollisionComponent = PipeEdgeCollisionComponent;