var CollisionSystem = function(entities) {
	this.entities = entities;
};

CollisionSystem.prototype.run = function(){
	window.setInterval(this.tick.bind(this), 2000);
};

CollisionSystem.prototype.tick = function() {
	for(var i=0; i<this.entities.length; i++) {
		var entityA = this.entities[i];
		if (!"collision" in entityA.components){
			continue;
		}

		for(var j=i+1; j<this.entities.length; j++){
			var entityB = this.entities[j];
			if(!"collision" in entityB.components){
				continue;
			}

			if(!entityA.components.collision.collidesWith(entityB)){
				continue;
			}
			//Shouldn't it be entityA.onCollision?
			if(entityA.components.collision.onCollision) {
				entityA.components.collision.onCollision(entityB);
			}

			if(entityB.components.collision.onCollision) {
				entityB.components.collision.onCollision(entityA);
			}
		}
	}
};

// CollisionSystem.prototype.tick = function() {
// 	for(var i=0; i<this.entities.length; i++) {
// 		var entityA = this.entities[i];
// 		console.log(entityA);
// 		if ("collision" in entityA.components){
// 			console.log(entityA+"has collision");
// 			for(var j=i+1; j<this.entities.length; j++){
// 				var entityB = this.entities[j];
// 				console.log(j);
// 				if("collision" in entityB.components){
// 					console.log(entityB);
// 					if(entityA.components.collision.collidesWith(entityB)){
// 						if(entityA.onCollision){
// 							entityA.onCollision(entityB);
// 						}
// 						else if(entityB.onCollision){
// 							entityB.onCollision(entityA);
// 						}
// 					}
// 				}
// 			}	
// 		}
// 	}
// };

exports.CollisionSystem = CollisionSystem;