// $(function(){
// 	$("body").velocity("fadeIn", { duration: 1000 });
// 	$(".features li").velocity({ translateX: [0, "-30em"], opacity: [1, 0] }, { duration: 800 });
// 	$("h1").velocity({ translateY: [0, "-10em"]}, { duration: 800 });
// 	if(window.innerWidth > 768){
// 		$(".btn-action, nav li, footer li").on("mouseenter", function(){
// 			$("a", this).velocity({"border-radius": "0", "padding": "0.7em"}, {"easing": "spring"});
// 		}).on("mouseleave", function(){
// 			$("a", this).velocity({"border-radius": "0.3em", "padding": "0.5em"}, {"easing": "spring"});
// 		});
// 		$(".btn-action").on("click", function(){
// 			$(this)
// 			.velocity({"translateX": "0.5em", "translateY": "-0.5em", "rotateZ": "25deg"}, {"duration": 100, "easing": "easeIn"})
// 			.velocity("reverse")
// 			.velocity({"translateX": "-0.4em", "rotateZ": "-15deg"}, {"duration": 100})
// 			.velocity("reverse");
// 		});
// 	}

// });
jQuery(document).ready(function ($) {
            
            var jssor_1_SlideshowTransitions = [
              {$Duration:1200,$Opacity:2}
            ];
            
            var jssor_1_options = {
              $AutoPlay: true,
              $SlideshowOptions: {
                $Class: $JssorSlideshowRunner$,
                $Transitions: jssor_1_SlideshowTransitions,
                $TransitionsOrder: 1
              },
              $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$
              },
              $BulletNavigatorOptions: {
                $Class: $JssorBulletNavigator$
              }
            };
            
            var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
            
            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizing
            function ScaleSlider() {
                var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
                if (refSize) {
                    refSize = Math.min(refSize, 600);
                    jssor_1_slider.$ScaleWidth(refSize);
                }
                else {
                    window.setTimeout(ScaleSlider, 30);
                }
            }
            ScaleSlider();
            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            //responsive code end
        });


