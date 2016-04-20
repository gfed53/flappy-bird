$(function(){
	$("body").velocity("fadeIn", { duration: 1000 });
	$(".features li").velocity({ translateX: [0, "-30em"], opacity: [1, 0] }, { duration: 800 });
	$("h1").velocity({ translateY: [0, "-10em"]}, { duration: 800 });
	if(window.innerWidth > 768){
		$(".btn-action, nav li, footer li").on("mouseenter", function(){
			$("a", this).velocity({"border-radius": "0", "padding": "0.7em"}, {"easing": "spring"});
		}).on("mouseleave", function(){
			$("a", this).velocity({"border-radius": "0.3em", "padding": "0.5em"}, {"easing": "spring"});
		});
		$(".btn-action").on("click", function(){
			$(this)
			.velocity({"translateX": "0.5em", "translateY": "-0.5em", "rotateZ": "25deg"}, {"duration": 100, "easing": "easeIn"})
			.velocity("reverse")
			.velocity({"translateX": "-0.4em", "rotateZ": "-15deg"}, {"duration": 100})
			.velocity("reverse");
		});
	}

});

