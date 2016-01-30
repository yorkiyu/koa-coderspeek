define(function(require,exports,module){
	var $ = require("jquery");
	var $login_layer = $("#login-layer"),
		$go_register = $login_layer.find("#go-register"),
		$go_login = $login_layer.find("#go-login"),
		$go_flip = $login_layer.find(".go-flip"),
		$login = $login_layer.find("#login"),
		$content = $login_layer.find(".content"),
		$login_btn = $("#login-btn"),
		$login_wrap = $("#login-wrap");
	var eleBack = null,
		eleFront = null;
	function funBackOrFront(){
		$content.each(function() {
			if ($(this).hasClass("flip-out")) {
				eleBack = $(this);
			} else {
				eleFront = $(this);
			}
		});
	}
	funBackOrFront();
	$login_layer.bind("click",function(e){
		var target = e.target || e.srcElement,
			$target = $(target);
		if($target.hasClass("login-layer")){
			$login_layer.removeClass("show").addClass("hide")      
		}else if($target.hasClass("close") || $target.parents(".close").length > 0){
			$login_layer.removeClass("show").addClass("hide")      
		}else if($target.hasClass("go-flip")){
			eleFront.addClass("flip-out").removeClass("flip-in");
			setTimeout(function() {
				eleBack.addClass("flip-in").removeClass("flip-out");
				funBackOrFront();
			}, 225);
		}
	});
	$login_btn.bind("click",function(){
		if($login_layer.hasClass("hide")){
			$login_layer.removeClass("hide").addClass("show")      
		}else {
			$login_layer.removeClass("show").addClass("hide")      
		} 
	});

	exports.loginEmit = function(){
		$login_btn.trigger("click");	
	}
	exports.isAuth = function(){
		if($login_wrap.attr("data-id")){
			return true;	
		}else {
			return false;	
		}	
	}
});
