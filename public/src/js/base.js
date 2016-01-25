define(function(require,exports,module){
    var constants = require('/src/js/common/constants.js');
	
	//go top
	(function(){
		var tipsTimer = null,gotopTimer = null,isVisble = false;
		$gotop_tips = $(constants.goTopTips);
		$(window).bind("scroll",function(){
			if($(window).scrollTop() > constants.clientInfo.height * (2 / 3)){
				if(isVisble){
					return;	
				}
				isVisble = true;	
				$("body").append($gotop_tips);
				clearInterval(tipsTimer);
				tipsTimer = setTimeout(function(){
					isVisble && $gotop_tips.remove();	
					isVisble = false;
				},2000);
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
});
