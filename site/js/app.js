$(function(){
	$("body").velocity("fadeIn", { duration: 1500 });
	$(".lnk-home").on("click", function(e){
		e.preventDefault();
		console.log("Clicked btn");

	});
	$(".action a").on("click", function(e){
		e.preventDefault();
		console.log("clicked button");
		$(this).velocity( { translateY: "-10px", backgroundColor: "#FFEB3B" }, 400 );
	});
});

