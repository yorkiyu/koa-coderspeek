define(function(require,exports,module){
    var $ = require('jquery');
	var constants = require("/src/js/common/constants.js");
	var simplemde = null,isSaving = false,_this;

    //define markdown html format
    function redefineRender(){
        if(!simplemde){
            return; 
        } 
        simplemde.renderer.image = function(href,title,text){
            var html = '<p class="markdown-img"><span class="img-box" data-src="'+href+'"><span class="img-holderplace">技术说</span></span></p>';    
            return html; 
        } 
    }
	function Editor(opt){
		_this = this;
		_this.options = opt || {};
		_this.options.upload_url = _this.options.upload_url?_this.options.upload_url:"/upload/images";	
		_this.options.loading_src = _this.options.loading_src?_this.options.loading_src:"/images/i_load.gif";	
	}
	Editor.prototype.removeEditor = function(){
		$(".editor-toolbar").remove();
		$(".CodeMirror-wrap").remove();
		$(".editor-preview-side").remove();
		simplemde = null;					
	}
	Editor.prototype.createEditor = function(callback){
		if(simplemde){
			return;	
		}
		var $textArea = $("#"+_this.options.id);
		//editor holder
		_this.$editorHolder = $(constants.editorHolder);
		_this.$editorHolder.insertAfter($textArea);
		require.async(['simplemde','uploadi','simplemde-css','uploadi-css'],function(SimpleMDE,Uploadi,a,b){
			_this.$editorHolder.remove();
			simplemde = new SimpleMDE({ 
				element: $textArea[0],
				uploadi: Uploadi,
				upload_url: _this.options.upload_url,
				loading_src: _this.options.loading_src,
				status: false,
				spellChecker: false,
				insertTexts: {
					image: Uploadi?["![](",")"]:["![](http://", ")"]	
				}
			});
			callback && callback();
            //redefineRender();
		});	
	}
	Editor.prototype.value = function(val){
		return simplemde.value(val);		
	}
	Editor.prototype.getHtml = function(){
		return simplemde.options.previewRender(simplemde.value());	
	}
	Editor.prototype.save = function(params,callback){
		if(isSaving){
			return;	
		}
		isSaving = true;
		$.ajax({
			type: "post",
			url: params.url,
			data: params.data,
			dataType: "json",
			success: function(ret){
				callback && callback(null,ret);		
				isSaving = false;
			},
			error: function(e){
				callback && callback(e);	
				isSaving = false;
			}
		});
	}
	module.exports = Editor;
});
