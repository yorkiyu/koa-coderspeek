define(function(require,exports,module){
    var $ = require('jquery');
    var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
    var constants = require('/src/js/common/constants.js');
	var base = require('/src/js/base.js');
	var login = require('/src/js/login.js');
   
	var $content_wrap = $("#content-wrap");
    //main module 
    var MainModule =  function(){
        var $aside_wrap = $("#aside-wrap"),
            $aside_panel = $aside_wrap.find('.aside-panel');  
        function run(){
            initLayout();
			asideHandler();
			EditorModule.run();
			conImages(); 
        }
		function getProid(){
			return $aside_wrap.attr("data-proid");
		}
		function asideHandler(){
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
                lazyload.emit();
            }).bind('resize',function(){
                $aside_panel.css({
                    'width': $aside_wrap.width() + 'px' 
                }); 
            }); 
            $(window).trigger('scroll');
            
		}
        function initLayout(){
            $aside_panel.css({
                'width': $aside_wrap.width() + 'px'
            }); 
        }
		
		//设置图片占位符，初始化图片延时加载
        function conImages(){
            var $content_wrap = EditorModule.get$conwrap();
            $content_wrap.find(".img-box").each(function(){
                var $_this = $(this);
                var data_src = $_this.attr("data-src");
                var img_w = base.getParam("img_w",data_src),
                    img_ratio = base.getParam("img_ratio",data_src),
                    box_w = $content_wrap.width();
                $_this.parents(".img-wrap:eq(0)").css({
                    width:  img_w>box_w?'100%':img_w + 'px',
                    height: img_w>box_w?box_w*img_ratio:img_w*img_ratio,
                    display: 'block',
                    margin: '0 auto' 
                });
            });
            
            //加载图片
            lazyload.push($(".img-box"));
            lazyload.emit();
        }

        return {
            run: run,
			getProid: getProid,
			conImages: conImages
        }
    }();

	/**
		edit module
	**/
	var EditorModule = function(){
		var Editor = require("/src/js/common/editor.js"),
			editor = new Editor({
				id: "markdown",
				upload_url: "/api/upload/images?type=note"
			});
		var $editorFooter = $(constants.editorFooter);
		$editorFooter.find(".save").addClass("disabled");

		var $edit = $content_wrap.find("#edit"),
			$content_list = $content_wrap.find(".content-list"),
			$markdown_wrap = $content_wrap.find(".markdown-wrap"),
			$instruct = $content_wrap.find(".instruct"),
			$instruct_content = $instruct.find(".instruct-content");
			
		function run(){
			$content_wrap.bind("click",function(e){
				var target = e.target || e.srcElement,
					$target = $(target);
				if($target.hasClass("edit")){
					editHandler($target);	
				}else if($target.parents(".edit").length > 0){
					editHandler($target.parents(".edit"));
				}else if($target.hasClass("cancel")){
					cancelHandler($target);	
				}else if($target.hasClass("save")){
					saveHandler($target);	
				}
			});	
			
			//redefine changehandler
			editor.changeHandler = function(){
				if(editor.value()){
					$editorFooter.find(".save").removeClass("disabled");	
				}else {
					$editorFooter.find(".save").addClass("disabled");	
				}			
			}
		}
		function saveHandler($target){
			$target.html(constants.load_img);
            editor.save({
                url: "/api/opensrc/project/updateinstr?proid="+MainModule.getProid(),
                data: { 'markdown': editor.value()}
            },function(err,ret){
                if(err){
					           
                }else {
                    $instruct_content.html(ret.data);
					editor.removeEditor();
					$instruct_content.show();	
					$content_list.show();
					$edit.show();
					$editorFooter.hide();

					MainModule.conImages();
                }
                $target.html("发布");
            });
	
		}
		function cancelHandler($target){
			if(!confirm("确定取消")){
				return;	
			}
            editor.removeEditor();
			$instruct_content.show();	
			$content_list.show();
			$edit.show();
			$editorFooter.hide();
		}
		function editHandler($target){
			$instruct_content.hide();	
			$content_list.hide();
			$edit.hide();
			$editorFooter.show();
			var eret = editor.createEditor(function(simplemde){
				$editorFooter.insertAfter(".editor-preview-side");				
				setEditorVal();	
            });
			function setEditorVal(){
				$.ajax({
					type: "get",
					url: "/api/opensrc/project/instr?proid="+MainModule.getProid(),
					dataType: "json",
					success: function(ret){
						if(!ret.status){
						
						}else {
							editor.value(ret.data.content);	
							$editorFooter.find(".save").addClass("disabled");	
						}
					},
					error: function(){
					
					}
				});
			}
		}
		function get$conwrap(){
			return $instruct_content;	
		}
		return {
			run: run,
			get$conwrap: get$conwrap
		}
	}();
    MainModule.run();
});
