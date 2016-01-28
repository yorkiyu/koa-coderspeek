define(function(require,exports,module){
    var constants = require('/src/js/common/constants.js');
	
	//go top
	(function(){
		var tipsTimer = null,gotopTimer = null,isVisble = false,isShow = false;
		$gotop_tips = $(constants.goTopTips);
		$(window).bind("scroll",function(){
			if($(window).scrollTop() > constants.clientInfo.height * (2 / 3)){
				if(isVisble || isShow){
					return;	
				}
				isVisble = true;	
                isShow = true;
				$("body").append($gotop_tips);
				clearInterval(tipsTimer);
				tipsTimer = setTimeout(function(){
					isVisble && $gotop_tips.remove();	
					isVisble = false;
				},6000);
			}else {
				isVisble && $gotop_tips.remove();	
				isVisble = false;
			}
		});
		//close action
		$gotop_tips.find(".cancel").bind("click",function(){
			isVisble && $gotop_tips.remove();
			isVisble = false;
		});
		$(document).bind("keydown",function(e){
			if(e.keyCode == 17 ||  e.keyCode != 32 && !e.ctrlKey){
				return;	
			}
			$(window).scrollTop(0);
		});	
	})();
    
    //login 
    (function(){
        var $login_layer = $("#login-layer"),
            $go_register = $login_layer.find("#go-register"),
            $go_login = $login_layer.find("#go-login"),
            $go_flip = $login_layer.find(".go-flip"),
            $login = $login_layer.find("#login"),
            $content = $login_layer.find(".content");

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
        $go_flip.bind("click",function(){
            eleFront.addClass("flip-out").removeClass("flip-in");
            setTimeout(function() {
                eleBack.addClass("flip-in").removeClass("flip-out");
                funBackOrFront();
            }, 225);
            return false;
        });
    })();

    var Utils = { 
        getParam: function(name,source){
            var pattern = new RegExp("(\\?|#|&)" + name + "=([^&#]*)");
            var m = (source || window.location.href).match(pattern);
            return (!m?"":m[2]);
        },
        clientInfo: {
            width: $(window).width(),
            height: $(window).height()
        }
    }
    module.exports = Utils;
});
