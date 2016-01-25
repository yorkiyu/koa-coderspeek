define(function(require,exports,module){
    var $ = require('jquery');
    var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
    var constants = require('/src/js/common/constants.js');
	var base = require('/src/js/base.js');
    var clientInfo = {
        width: $(window).width(),
        height: $(window).height()
    }
    //main module 
    var MainModule =  function(){
        var $aside_wrap = $("#aside-wrap"),
            $aside_panel = $aside_wrap.find('.aside-panel');  
        function run(){
            initLayout();
            $(window).bind('scroll',function(){
                if($(window).scrollTop()>=30){
                    $aside_panel.css({
                        position: 'fixed',
                        top: '50px'
                    });  
                }else {
                    $aside_panel.css({
                        position: 'static',
                        top: '0'
                    }); 
                }
            }).bind('resize',function(){
                $aside_panel.css({
                    'width': $aside_wrap.width() + 'px' 
                }); 
            }); 
            $(window).trigger('scroll');
			EditorModule.run();
        }
        function initLayout(){
            $aside_panel.css({
                'height': clientInfo.height - 50 + 'px',
                'width': $aside_wrap.width() + 'px'
            }); 
        }
        return {
            run: run 
        }
    }();

	//editro module 
	var EditorModule = function(){
		var Editor = require("/src/js/common/editor.js"),
			editor = new Editor({
				id: "markdown",
				upload_url: "/api/upload/images?type=daniel"
			});
		var $editorFooter = $(constants.editorFooter),
			isInsertFooter = false,
			$portrait = $("#portrait"),
			$content_wrap = $("#content-wrap");
		function run(){
			//没有内容，占位符事件
			$("#empty-btn").bind("click",function(){
				$content_wrap.find(".content").hide();
				$content_wrap.find("#edit").hide();
				editor.createEditor(function(){
					//回调，插入编辑器底部功能按钮
					if(!isInsertFooter){
						$editorFooter.insertAfter(".editor-preview-side");
						isInsertFooter = true;
					}else {
						$editorFooter.show();	
					}
				});	
			});
			//编辑按钮，事件
			$content_wrap.find("#edit").bind("click",function(){
				$content_wrap.find(".content").hide();	
				$content_wrap.find("#edit").hide();
				editor.createEditor(function(){
					//回调，插入编辑器底部功能按钮
					if(!isInsertFooter){
						$editorFooter.insertAfter(".editor-preview-side");
						isInsertFooter = true;
					}else {
						$editorFooter.show();	
					}
					editor.value($content_wrap.find("#old-markdown").text());
				});
			});
			//编辑器底部按钮事件代理
			$editorFooter.bind("click",function(e){
				var target = e.target || e.srcElement;
				var $target = $(target);
				if($target.hasClass("cancel")){
					if(!confirm("确定取消编辑！")){
						return;	
					}
					$editorFooter.hide();
					editor.removeEditor();
					$content_wrap.find(".content").show();
					$content_wrap.find("#edit").show();
				}else if($target.hasClass("save")){
					$target.html(constants.load_img);
					editor.save({
						url: "/api/daniel/person/saveintro?id="+$portrait.attr("data-id"),
						data: {
							html: editor.getHtml(),
							markdown: editor.value()
						} 
					},function(ret){
						if(ret){
									
						}else {
							$content_wrap.find(".content").html(editor.getHtml()).show();		
							$content_wrap.find("#old-markdown").text(editor.value());
							$content_wrap.find("#edit").removeClass("hide").show();
							$editorFooter.hide();
							editor.removeEditor();
						}
						$target.html("发布");
					});		
				}
			});
		}
		return {
			run: run	
		}	
	}();

    //run 
    MainModule.run();
});



