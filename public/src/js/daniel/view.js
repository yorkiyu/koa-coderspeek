define(function(require,exports,module){
    var $ = require('jquery');
    var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
    var constants = require('/src/js/common/constants.js');
	var base = require('/src/js/base.js');
	var login = require('/src/js/login.js');
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
                lazyload.emit();
            }).bind('resize',function(){
                $aside_panel.css({
                    'width': $aside_wrap.width() + 'px' 
                }); 
            }); 
            $(window).trigger('scroll');
			EditorModule.run();
            conImages(); 
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
                    box_w = $content_wrap.find(".content-panel").width();
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
            conImages: conImages
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
				//权限验证
				if(!login.isAuth()){
					login.loginEmit();	
					return;
				}
		        emptyEditHandler();					
            });
			//编辑按钮，事件
			$content_wrap.find("#edit").bind("click",function(){
				//权限验证
				if(!login.isAuth()){
					login.loginEmit();	
					return;
				}
	            editHandler();		
            });
			//编辑器底部按钮事件代理
			$editorFooter.bind("click",function(e){
				var target = e.target || e.srcElement;
				var $target = $(target);
				if($target.hasClass("cancel")){
			        cancelHandler($target);	
                }else if($target.hasClass("save")){
			        saveHandler($target);			
				}
			});
		}
        function get$conwrap(){
            return $content_wrap; 
        }
        function emptyEditHandler(){
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
        }
        function editHandler(){
            $.ajax({
                type: "get",
                url: "/api/daniel/person/intro?id="+$portrait.attr("data-id"),
                dataType: "json",
                success: function(ret){
                    if(!ret.status){
                    
                    }else {
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
                            editor.value(ret.data);
                        });
                    }
                },
                error: function(ret){
                
                }
            });
        }
        function cancelHandler($target){
            if(!confirm("确定取消编辑！")){
                return;	
            }
            $editorFooter.hide();
            editor.removeEditor();
            $content_wrap.find(".content").show();
            $content_wrap.find("#edit").show();
        }
        function saveHandler($target){
            $target.html(constants.load_img);
            editor.save({
                url: "/api/daniel/person/saveintro?id="+$portrait.attr("data-id"),
                data: { 'markdown': editor.value()}
            },function(err,ret){
                if(err){
                            
                }else {
                    $content_wrap.find(".content").html(ret.data).show();		
                    //设置图片占位符
                    MainModule.conImages();
                    $content_wrap.find("#edit").removeClass("hide").show();
                    $editorFooter.hide();
                    editor.removeEditor();
                }
                $target.html("发布");
            });
        }

		return {
			run: run,
            get$conwrap: get$conwrap
		}	
	}();

    //run 
    MainModule.run();
});

