$(function(){
	$("body").velocity("fadeIn", { duration: 1000 });
	$(".lnk-home").on("click", function(e){
		e.preventDefault();
		console.log("Clicked btn");

	});
	$(".action a").on("click", function(e){
		e.preventDefault();
		console.log("clicked button");
		$(this).velocity( { "translateY": "-10px"}, 400 );
	});

	$(".action a").on("mouseenter", function(){
		console.log("hover");
		$(this).velocity({"border-radius": "0", "padding": "0.7em 0.7em"}, {"easing": "spring"});
	}).on("mouseleave", function(){
		console.log("leaving");
		$(this).velocity("reverse");
	});

	$(".action input").on("click", function(){
		console.log("this works?");
		$(this).velocity({"translateX": "2em", "rotateZ": "360deg"}, {"easing": "easeIn"})
		.velocity("reverse");
	});
});

