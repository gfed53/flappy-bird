$(function(){
	$("body").velocity("fadeIn", { duration: 1000 });
	$(".lnk-home").on("click", function(e){
		e.preventDefault();
		console.log("Clicked btn");

	});
	// $(".action a").on("click", function(e){
	// 	e.preventDefault();
	// 	console.log("clicked button");
	// 	$(this).velocity( { "translateY": "-10px"}, 400 );
	// });

	$(".action input").on("mouseenter", function(){
		console.log("hover");
		$(this).velocity({"border-radius": "0", "padding": "0.7em"}, {"easing": "spring"});
	}).on("mouseleave", function(){
		console.log("leaving");
		$(this).velocity({"border-radius": "0.3em", "padding": "0.5em"}, {"easing": "spring"});
		// .velocity({"translateX": "0", "translateY": "0", "rotateZ": "15deg"});
	});

	$(".action input").on("click", function(){
		console.log("this works?");
		$(this)
		.velocity({"translateX": "0.5em", "translateY": "-0.5em", "rotateZ": "25deg"}, {"duration": 100, "easing": "easeIn"})
		.velocity("reverse")
		.velocity({"translateX": "-0.4em", "rotateZ": "-15deg"}, {"duration": 100})
		.velocity("reverse");
	});
});

