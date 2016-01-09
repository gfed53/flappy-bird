var CircleCollisionComponent = function(entity, radius){
	this.entity = entity;
	this.radius = radius;
	this.type = "circle";
};

CircleCollisionComponent.prototype.collidesWith = function(entity){
	if(entity.components.collision.type === "circle"){
		return this.collideCircle(entity);
	}
	else if(entity.components.collision.type === "rect"){
		return this.collideRect2(entity);
	}
    else if(entity.components.collision.type === "edge"){
        return this.collideEdge(entity);
    }
    else if(entity.components.collision.type === "pipe-edge"){
        return this.collidePipeEdge(entity);
    }
	return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity){
	var positionA = this.entity.components.physics.position;
	var positionB = entity.components.physics.position;

	var radiusA = this.radius;
	var radiusB = entity.components.collision.radius;

	var diff = {
		x: positionA.x - positionB.x,
		y: positionA.y - positionB.y
	};

	var distanceSquared = diff.x * diff.x + diff.y * diff.y;
	var radiusSum = radiusA + radiusB;

	return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var clamp = function(value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;
    // console.log(positionA);
    // console.log(positionB);
    // console.log(sizeB);
    var closest = {
        x: clamp(positionA.x, positionB.x - sizeB.x / 2,
                 positionB.x + sizeB.x / 2),
        y: clamp(positionA.y, positionB.y - sizeB.y / 2,
                 positionB.y + sizeB.y / 2)
    };
    // if (positionB.x === 0) {
    //     if(positionA.y >= positionB.y){
    //         console.log("collide");
    //     }
    //     else{
    //         console.log("no collision");
    //     }
    // } else {
    //     console.log("not on edge yet");
    // }

    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;

    return distanceSquared < radiusA * radiusA;
};

CircleCollisionComponent.prototype.collideRect2 = function(entity) {
    var clamp = function(value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;
    console.log(positionA);
    console.log(positionB);
    console.log(sizeB);
    var closest = {
        x: clamp(positionA.x, positionB.x,
                 positionB.x + sizeB.x),
        y: clamp(positionA.y, positionB.y,
                 positionB.y + sizeB.y)
    };

    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;

    return distanceSquared < radiusA * radiusA;
};

CircleCollisionComponent.prototype.collideEdge = function(entity){
    var positionA = this.entity.components.physics.position.y;
    var positionB = entity.components.physics.position.y;

    if(positionB === 1){
        return positionA > positionB;
    } else if(positionB === 0){
        return positionA < positionB;
    }
}

CircleCollisionComponent.prototype.collidePipeEdge = function(entity){
    // var positionA = this.entity.components.physics.position.x;
    var positionB = entity.components.physics.position.x;
    // console.log(positionA+" a");
    console.log(positionB+" b");

    return positionB < 0.01 && positionB > -0.01;
}

exports.CircleCollisionComponent = CircleCollisionComponent;










