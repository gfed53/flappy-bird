$(function(){
	$("body").velocity("fadeIn", { duration: 1000 });
	$(".features li").velocity({ translateX: [0, "-30em"], opacity: [1, 0] }, { duration: 800 });

	$("h1").velocity({ translateY: [0, "-10em"]/*, opacity: [1, 0.2]*/ }, { duration: 800 });
	// $(".btn-action").on("click", function(e){
	// 	e.preventDefault();
	// 	console.log("clicked button");
	// 	$(this).velocity( { "translateY": "-10px"}, 400 );
	// });

	$(".btn-action, nav li, footer li").on("mouseenter", function(){
		console.log("hover");
		$("a", this).velocity({"border-radius": "0", "padding": "0.7em"}, {"easing": "spring"});
		}).on("mouseleave", function(){
		console.log("leaving");
		$("a", this).velocity({"border-radius": "0.3em", "padding": "0.5em"}, {"easing": "spring"});
		// .velocity({"translateX": "0", "translateY": "0", "rotateZ": "15deg"});
	});

	$(".btn-action").on("click", function(e){
		e.preventDefault();
		console.log("this works?");
		$(this)
		.velocity({"translateX": "0.5em", "translateY": "-0.5em", "rotateZ": "25deg"}, {"duration": 100, "easing": "easeIn"})
		.velocity("reverse")
		.velocity({"translateX": "-0.4em", "rotateZ": "-15deg"}, {"duration": 100})
		.velocity("reverse");
	});
});

