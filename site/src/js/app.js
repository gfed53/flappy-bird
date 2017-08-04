//JSSOR CAROUSEL

jQuery(document).ready(function ($) {
	
	// Horizontal Carousel
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
	
      
            ScaleSlider(jssor_1_slider);
            $(window).bind("load", ScaleSlider(jssor_1_slider));
            $(window).bind("resize", ScaleSlider(jssor_1_slider));
            $(window).bind("orientationchange", ScaleSlider(jssor_1_slider));


// Vertical Carousel
var jssor_2_options = {
	$AutoPlay: true,
	$DragOrientation: 2,
	$PlayOrientation: 2,
	$ArrowNavigatorOptions: {
		$Class: $JssorArrowNavigator$
	}
};

var jssor_2_slider = new $JssorSlider$("jssor_2", jssor_2_options);

            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizing
            ScaleSlider(jssor_2_slider);
            $(window).bind("load", ScaleSlider(jssor_2_slider));
            $(window).bind("resize", ScaleSlider(jssor_2_slider));
            $(window).bind("orientationchange", ScaleSlider(jssor_2_slider));
            //responsive code end
	function ScaleSlider(slider) {
		var refSize = slider.$Elmt.parentNode.clientWidth;
		if (refSize) {
			refSize = Math.min(refSize, 600);
			slider.$ScaleWidth(refSize);
		}
		else {
			window.setTimeout(ScaleSlider, 30);
		}
	}
});
