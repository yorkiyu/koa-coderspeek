define(function(require,exports,module){
	var $ = require('jquery');
	//add event
	$(document).bind("loadimg",loadImg);
	var img_lists = [],
		loading = false;
	function loadImg(){
		if(img_lists.length <=0 || loading){
			return;
		}
		loading = true;
		var i=0,
			scrollTop = $(window).scrollTop();
		for(i=0;i<img_lists.length;i++){
			var coords = img_lists[i].offset();
			if(coords.top>=scrollTop-100 && coords.top<=scrollTop+$(window).height()+150){

				runLoadImg($(img_lists[i]));
				img_lists.splice(i,1);
				i--;

			}
		}
		loading = false;
	}
	function runLoadImg(obj){
		var img = new Image();
		img.src = obj.attr("data-src");
		img.onload = function(e){
			obj.html('<img src="'+img.src+'"/>');
			fixImgSize(obj.find('img'),img.width,img.height,obj);
		}
		img.onerror = function(e){
			obj.find('.img-placeholder').text("加载失败");
			console.log("load failed:"+img.src);
		}
	}
	function fixImgSize(obj,imgw,imgh,img_box){
		var boxh = img_box.height(),
			boxw = img_box.width(),
			posX = img_box.attr("data-x"),
			posY = img_box.attr("data-y");
		//if imgw = boxw the imgh value
		var h = (imgh/imgw)*boxw;
		//if imgh = boxh the imgw value
		var w = (imgw/imgh)*boxh;
		if(h>boxh){
			var margin_val = -1*(h-boxh)/2 + "px";
			if(posY && posY > 0.6){
				margin_val = -1*(h-boxh) + "px"; 
			}else if(posY && posY < 0.4){
				margin_val = 0; 
			}
			obj.css({
				"width": "100%",
				"height": "auto",
				"margin-top": margin_val
			});
			return;	
		}else if(h==boxh){
			obj.css({
				"width": "100%",
				"height": "auto"
			});
			return;
		}else if(h<boxh){
			if(w>boxw){
				var margin_val = -1*(w-boxw)/2 + "px";
				if(posX && posX > 0.6){
					margin_val = -1*(w-boxw) + "px"; 
				}else if(posX && posX < 0.4){
					margin_val = 0; 
				}
				obj.css({
					"width": "auto",
					"height": "100%",
					"margin-left": margin_val
				});
			}else if(w==boxw){
				obj.css({
					"width": "auto",
					"height": "100%"
				})
			}else if(w<boxw){
				var x = (boxh/h)*boxw-boxw;
				x = Math.ceil(x);
				var margin_val = -1*(boxw + x)/2 + "px";
				if(posX && posX > 0.6){
					margin_val = -1*(boxw + x) + "px"; 
				}else if(posX && posX < 0.4){
					margin_val = 0; 
				}
				obj.css({
					"width": boxw + x + "px",
					"height": ((boxw + x)/imgw )*imgh + "px",
					"margin-left": margin_val 
				});	
			}
		}
		return obj;	
	}
	exports.push = function(objs){
		objs.each(function(){
			img_lists.push($(this));	
		});
	}
	exports.runLoadImg = runLoadImg;
	exports.emit = function (){
		$(document).trigger("loadimg");	
	}
});
