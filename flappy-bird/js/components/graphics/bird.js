var BirdGraphicsComponent = function(entity) {
	this.entity = entity;
}
step=0;

BirdGraphicsComponent.prototype.draw = function(context){
	context.save();
	context.beginPath();
	// context.arc(1+step, 1, 20, 0, 2 * Math.PI);
	context.fill();
	context.fillStyle="#0000FF";
	// for(var i=0; i<10; i++){
	// 	context.fillRect(10+i, 10+i, 25, 25);
	// }
	context.fillRect(0, 1, 2, -5);
	console.log("Drawing a bird.");
	step+=0.1;
	context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;